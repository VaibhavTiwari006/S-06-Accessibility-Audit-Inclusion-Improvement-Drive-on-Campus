import React from 'react';

export const Skeleton = ({ className = '' }) => (
  <div className={skeleton }></div>
);

export const SkeletonCard = () => (
  <div className="bg-cards rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="h-3 w-1/4 rounded" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-4/6 rounded" />
    </div>
  </div>
);
