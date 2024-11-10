// SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader = () => (
    <div className="app-container-hh h-screen-minus-80 flex flex-col overflow-hidden w-full p-4">
        {/* Header skeleton */}
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-4 animate-pulse"></div>

        {/* Calendar grid skeleton */}
        <div className="flex-1 grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                    <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div className="flex-1 flex flex-col space-y-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-10 bg-gray-300 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonLoader;
