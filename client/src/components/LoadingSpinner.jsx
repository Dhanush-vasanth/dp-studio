const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-gray-300 border-t-yellow-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export const LoadingSkeleton = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <>
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded overflow-hidden">
            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'list') {
    return (
      <>
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </>
    );
  }

  return <LoadingSpinner size="md" />;
};

export default LoadingSpinner;
