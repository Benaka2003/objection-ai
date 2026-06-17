export default function LoadingSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-6 w-32 bg-gray-200 rounded-full" />
        <div className="h-6 w-48 bg-gray-200 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl p-4 bg-gray-50 border-l-4 border-gray-200 flex flex-col gap-3"
          >
            {/* Badge */}
            <div className="h-6 w-24 bg-gray-200 rounded-full" />

            {/* Text lines */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/6" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-3/6" />
            </div>

            {/* Footer */}
            <div className="pt-1 border-t border-gray-100 flex gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3 animate-pulse">
        ObjectionAI is thinking...
      </p>
    </div>
  );
}