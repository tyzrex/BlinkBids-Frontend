/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fdS9fdyeRqO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Loading() {
  return (
    <div className="space-y-12 max-w-layout flex items-center flex-col w-full">
      <div className="h-[350px] bg-gray-200 dark:bg-gray-800 animate-shimmer rounded-lg overflow-hidden w-full" />
      <div className="grid gap-10 w-full">
        <div className="bg-gray-100 dark:bg-gray-800 h-4 w-full rounded-lg" />
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
        <div className="bg-gray-200 dark:bg-gray-800 h-4 w-1/5 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-between">
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
        <div className="bg-gray-200 dark:bg-gray-800 h-4 w-1/5 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-between">
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
        <div className="bg-gray-200 dark:bg-gray-800 h-4 w-1/5 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-between">
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
      </div>
    </div>
  );
}
