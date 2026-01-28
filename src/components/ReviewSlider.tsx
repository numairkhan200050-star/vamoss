import React, { useState, useEffect } from 'react';
import { Quote, CheckCircle } from 'lucide-react';
import { RatingStars } from './RatingStars';

const reviews = [
  {
    id: 1,
    name: "Ahmed Khan",
    location: "Karachi",
    text: "Ordered the S9 Ultra Watch. The delivery was super fast (2 days) and the quality is exactly as shown in the video. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Sana Malik",
    location: "Lahore",
    text: "The Hair Dryer Brush is a life saver! Best price I found in Pakistan. Packaging was very secure.",
    rating: 5
  },
  {
    id: 3,
    name: "Zeeshan Ali",
    location: "Islamabad",
    text: "Excellent customer support. They guided me through the WhatsApp order process very professionally.",
    rating: 4
  }
];

export const ReviewSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-16 border-y-2 border-black overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black uppercase italic mb-12 flex items-center justify-center gap-3">
          <Quote className="text-[#D4AF37]" size={40} /> What Our Customers Say
        </h2>

        <div className="relative h-[250px]">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex justify-center mb-4">
                <RatingStars rating={review.rating} />
              </div>
              
              <p className="text-xl font-bold italic text-gray-800 mb-6 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex flex-col items-center">
                <span className="font-black uppercase tracking-tighter text-lg">{review.name}</span>
                <div className="flex items-center gap-1 text-[#25D366] text-xs font-bold uppercase">
                  <CheckCircle size={12} fill="currentColor" className="text-white" />
                  Verified Buyer from {review.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all ${i === current ? 'w-8 bg-black' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
