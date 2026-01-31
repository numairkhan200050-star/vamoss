import React from 'react';

const categories = [
  { id: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400', collectionId: 'gadgets' },
  { id: 2, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=400', collectionId: 'men-grooming' },
  { id: 3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400', collectionId: 'audio' },
  { id: 4, image: 'https://images.unsplash.com/photo-1526170315870-efeca63c5d53?q=80&w=400', collectionId: 'watches' },
  { id: 5, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400', collectionId: 'eyewear' },
];

const CategoryRow = () => {
  return (
    <div className="w-full py-8">
      <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            /** * SIZE REDUCED:
             * Mobile: w/h was [160px] -> now [120px]
             * Desktop: w/h was [220px] -> now [170px]
             */
            className="flex-shrink-0 w-[120px] h-[120px] md:w-[170px] md:h-[170px] relative group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300"
            onClick={() => console.log(`Maps to collection: ${cat.collectionId}`)}
          >
            <img 
              src={cat.image} 
              alt="category" 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
