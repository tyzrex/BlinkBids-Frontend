export default function CategoryCards({ name, image }: any) {
  return (
    <>
      <div
        className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-full 
      bg-blue-100 rounded-lg sm:rounded-xl
      lg:h-[100px] cursor-pointer hover:shadow-lg transition-shadow duration-300 color-transition flex flex-col items-center justify-center  border border-gray-300 "
      >
        <div className="text-sm sm:text-[22px] font-bold text-center h-[30px] w-full mt-1">
          {name}
        </div>
      </div>
    </>
  );
}
