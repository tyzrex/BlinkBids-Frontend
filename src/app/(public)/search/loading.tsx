import CardLoader from "../_components/Resusables/card-loader";

export default function Loading() {
  return (
    <>
      <main className="max-w-layout ">
        <div
          className="flex flex-col items-center gap-6 justify-center
        
       md:flex-row md:items-center md:justify-between md:text-left md:gap-0 py-6"
        >
          <div className="w-full">
            <div className="flex-between mb-5">
              <div className="title-typography w-1/2 h-8 bg-gray-200 animate-pulse"></div>
              <div className="lg:hidden"></div>
            </div>
            <div className="flex-between">
              <div className="text-gray-600 w-1/2 h-8 bg-gray-200 animate-pulse"></div>
              <div className="w-1/2 h-8 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
          <div className="lg:flex-center lg:w-[25%] hidden">
            <div className="w-full h-[600px] bg-gray-200 rounded-3xl animate-pulse"></div>
          </div>
          <div className="w-full h-full ">
            <div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5
      "
            >
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <CardLoader key={i} />
                ))}
            </div>

            <div className="w-full my-5">
              <div className="w-full h-8 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
