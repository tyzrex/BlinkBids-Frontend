export default function CategoriesLoader() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full bg-gray-200 dark:bg-gray-800 animate-shimmer rounded-lg overflow-hidden"
          >
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </>
  );
}
