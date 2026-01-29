import React from 'react';
import CategoryRow from './CategoryRow';
import ProductRow from './ProductRow';

const ContentArea = () => {
  // EXAMPLE DATA: In the future, this 'rows' array will come from your Admin Portal
  // You will be able to add/remove rows and change the 'heading' and 'collectionId'
  const dynamicRows = [
    {
      id: "row_1",
      heading: "New Arrivals",
      products: [
        { id: 101, name: "Gold Series Trimmer", price: "4,500", originalPrice: "6,000", image: "https://images.unsplash.com/photo-1621605815841-aa3398c89a01?q=80&w=400", isSale: true },
        { id: 102, name: "Advanced Hair Dryer", price: "3,200", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=400", isSale: false },
        { id: 103, name: "Precision Shaver", price: "2,800", originalPrice: "3,500", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400", isSale: true },
        { id: 104, name: "Barber Grade Clipper", price: "5,500", image: "https://images.unsplash.com/photo-1593702295094-ada74bc4a149?q=80&w=400", isSale: false },
        { id: 105, name: "Travel Grooming Kit", price: "1,500", image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=400", isSale: false },
      ]
    },
    {
      id: "row_2",
      heading: "On Sale Serums",
      products: [
        { id: 201, name: "Vitamin C Glow Serum", price: "1,200", originalPrice: "2,000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400", isSale: true },
        { id: 202, name: "Hyaluronic Acid Plus", price: "1,450", originalPrice: "1,800", image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400", isSale: true },
        { id: 203, name: "Retinol Night Repair", price: "2,100", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400", isSale: false },
        { id: 204, name: "Organic Face Oil", price: "950", originalPrice: "1,500", image: "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=400", isSale: true },
      ]
    }
  ];

  return (
    <div className="bg-white pb-20">
      {/* 1. Category Row (Fixed at the top of content) */}
      <CategoryRow />

      {/* 2. Dynamic Collection Rows */}
      {/* We map through the 'dynamicRows' so you can have 2, 5, or 10 rows easily */}
      <div className="space-y-4">
        {dynamicRows.map((row) => (
          <ProductRow 
            key={row.id} 
            heading={row.heading} 
            products={row.products} 
          />
        ))}
      </div>

      {/* 3. Extra Space for the Floating Search to not block the last product */}
      <div className="h-20" />
    </div>
  );
};

export default ContentArea;
