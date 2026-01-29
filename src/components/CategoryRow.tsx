import React from 'react';

// This data will eventually come from your Supabase 'categories' table
const categories = [
  { id: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400', collectionId: 'gadgets' },
  { id: 2, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=400', collectionId: 'men-grooming' },
  { id: 3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400', collectionId: 'audio' },
  { id: 4, image: 'https://images.unsplash.com/photo-1526170315870-efeca63c5d53?q=80&w=400', collectionId: 'watches' },
  { id: 5, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400', collectionId: 'eyewear' },
];

const CategoryRow = () => {
  return (
    <div className="w-full py-10">
      <div className="flex overflow-x-auto gap-6 px-6 pb-4 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className="flex-shrink-0 w-[160px] h-[160px] md:w-[220px] md:h-[220px] relative group cursor-pointer overflow-hidden rounded-[25px] border-4 border-black luxury-shadow-sm transition-transform hover:scale-95"
            onClick={() => console.log(`Maps to collection: ${cat.collectionId}`)}
          >
            {/* The Image */}
            <img 
              src={cat.image} 
              alt="category" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />

            {/* Subtle Overlay to make the image look premium */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
