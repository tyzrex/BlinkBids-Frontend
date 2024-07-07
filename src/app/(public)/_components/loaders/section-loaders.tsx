export default function SectionLoader() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-between my-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full bg-gray-200 dark:bg-gray-800 animate-shimmer rounded-lg overflow-hidden"
          >
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded" />
              <div className="h-3 w-1/5 bg-gray-100 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
