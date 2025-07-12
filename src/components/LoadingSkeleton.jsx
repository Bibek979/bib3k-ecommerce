import React from 'react';

const LoadingSkeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
      <div className="h-full w-full bg-gray-300 rounded"></div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadingSkeleton className="w-full h-48" />
      <div className="p-4">
        <LoadingSkeleton className="h-4 mb-2" />
        <LoadingSkeleton className="h-4 mb-2 w-3/4" />
        <div className="flex justify-between items-center mt-3">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <LoadingSkeleton className="w-full h-96 mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} className="w-full h-20" />
            ))}
          </div>
        </div>
        <div>
          <LoadingSkeleton className="h-8 mb-4" />
          <LoadingSkeleton className="h-6 mb-4 w-3/4" />
          <LoadingSkeleton className="h-10 w-32 mb-4" />
          <LoadingSkeleton className="h-4 mb-2" />
          <LoadingSkeleton className="h-4 mb-2 w-5/6" />
          <LoadingSkeleton className="h-4 mb-4 w-4/5" />
          <div className="flex gap-4 mb-6">
            <LoadingSkeleton className="h-12 w-32" />
            <LoadingSkeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
