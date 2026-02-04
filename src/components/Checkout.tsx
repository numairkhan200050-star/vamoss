import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Truck, Send, ShieldCheck, PackageCheck } from 'lucide-react';

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    province: 'Sindh',
    city: ''
  });

  const provinces = ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit Baltistan', 'AJK'];

  // Safety: Redirect if no product is selected
  useEffect(() => {
    if (!productData) {
      alert("No product selected!");
      navigate('/');
    }
  }, [productData, navigate]);

  /**
   * SHIPPING CALCULATION LOGIC
   * Fetches rates from Supabase and finds the correct block based on product weight.
   */
  useEffect(() => {
    const calculateShipping = async () => {
      if (!productData) return;

      try {
        const { data: rates, error } = await supabase
          .from('shipping_rates')
          .select('*')
          .order('max_weight_grams', { ascending: true });

        if (error) throw error;

        if (rates && rates.length > 0) {
          // Find the first block that covers our product weight
          const applicableRate = rates.find(r => productData.weight <= r.max_weight_grams) 
                                 || rates[rates.length - 1]; // Fallback to max block
          
          setShippingCost(Number(applicableRate.charge_pkr));
        } else {
          // Default fallback if table is empty
          setShippingCost(250); 
        }
      } catch (err) {
        console.error("Shipping Calc Error:", err);
        setShippingCost(250); // Safe fallback
      }
    };

    calculateShipping();
  }, [productData]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pakistani Phone Validation (03xxxxxxxxx)
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      return alert("Enter valid 11-digit number (03xxxxxxxxx)");
    }

    setIsSubmitting(true);

    try {
      // 1. Generate Tracking ID
      const trackingId = `K11-${Math.floor(1000 + Math.random() * 9000)}`;

      // 2. Insert into Orders Table
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          tracking_id: trackingId,
          customer_name: formData.name,
          phone: formData.phone,
          whatsapp_number: formData.whatsapp || formData.phone,
          address: formData.address,
          province: formData.province,
          city: formData.city,
          total_weight_grams: productData.weight,
          shipping_cost: shippingCost,
          total_amount: productData.price + shippingCost,
          status: 'pending'
        })
        .select().single();

      if (orderError) throw orderError;

      // 3. Insert Order Items
      const { error: itemsError } = await supabase.from('order_items').insert({
        order_id: order.id,
        product_id: productData.id,
        product_title: productData.title,
        variant_info: productData.variant,
        quantity: 1,
        price_per_unit: productData.price
      });

      if (itemsError) throw itemsError;

      // 4. WhatsApp Message Formatting
      const message = `*ORDER CONFIRMED - KEVIN11*%0A%0A` +
                      `*Tracking ID:* ${trackingId}%0A` +
                      `*Customer:* ${formData.name}%0A` +
                      `*Product:* ${productData.title} (${productData.variant})%0A` +
                      `*Amount:* Rs. ${productData.price + shippingCost}%0A%0A` +
                      `Shipping to ${formData.city}, ${formData.province}.`;

      const whatsappUrl = `https://wa.me/923282519507?text=${message}`;
      
      alert(`Order Placed! ID: ${trackingId}`);
      window.open(whatsappUrl, '_blank');
      navigate('/');
      
    } catch (err: any) {
      alert("Order Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productData) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 font-sans text-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: SHIPPING FORM */}
        <div className="lg:col-span-7 space-y-8">
          <div className="border-b-4 border-black pb-4">
            <h2 className="text-4xl font-black uppercase italic flex items-center gap-3">
              <Truck size={36} /> Checkout
            </h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cash on Delivery Details</p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="p-3 border-2 border-black">
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Full Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full font-bold outline-none uppercase" placeholder="AHMED KHAN" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border-2 border-black">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Phone (03xxxxxxxxx)</label>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full font-bold outline-none" placeholder="03XXXXXXXXX" />
              </div>
              <div className="p-3 border-2 border-black">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">WhatsApp (Optional)</label>
                <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full font-bold outline-none" placeholder="03XXXXXXXXX" />
              </div>
            </div>

            <div className="p-3 border-2 border-black">
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Shipping Address</label>
              <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full font-bold outline-none resize-none" placeholder="HOUSE NO, STREET, AREA NAME" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border-2 border-black">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Province</label>
                <select className="w-full font-bold outline-none bg-white" value={formData.province} onChange={(e) => setFormData({...formData, province: e.target.value})}>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="p-3 border-2 border-black">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">City</label>
                <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full font-bold outline-none uppercase" placeholder="KARACHI" />
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-black text-[#FFD700] py-6 font-black uppercase tracking-widest text-2xl hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center gap-3 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none"
            >
              {isSubmitting ? "Processing..." : <><Send size={24} /> Confirm Order (COD)</>}
            </button>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] sticky top-8">
            <h3 className="text-2xl font-black uppercase italic flex items-center gap-2 mb-8">
              <PackageCheck size={28} /> Summary
            </h3>
            
            <div className="flex gap-4 mb-8 pb-6 border-b-2 border-dashed border-gray-200">
              <img src={productData.image} alt="" className="w-20 h-20 border-2 border-black object-cover rounded-xl" />
              <div>
                <h4 className="font-black uppercase text-sm leading-tight">{productData.title}</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Variant: {productData.variant}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Weight: {productData.weight}g</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-bold text-gray-600 uppercase text-xs">
                <span>Subtotal</span>
                <span>Rs. {productData.price}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-600 uppercase text-xs">
                <span>Shipping ({productData.weight}g)</span>
                <span>Rs. {shippingCost}</span>
              </div>
              <div className="flex justify-between text-2xl font-black border-t-4 border-black pt-4">
                <span>TOTAL</span>
                <span className="text-black">Rs. {productData.price + shippingCost}</span>
              </div>
            </div>

            <div className="mt-8 bg-yellow-100 p-4 border-2 border-black flex items-center gap-3">
              <ShieldCheck className="shrink-0 text-black" size={24} />
              <p className="text-[9px] font-black leading-tight uppercase">Pay cash only when you receive and open the parcel at your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
