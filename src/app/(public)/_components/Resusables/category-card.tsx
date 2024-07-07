export default function CategoryCards({ name, image }: any) {
  return (
    <>
      <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-full cursor-pointer hover:shadow-lg transition-shadow duration-300 color-transition flex flex-col items-center justify-center  border border-gray-300 bg-white ">
        <div className="text-sm sm:text-[16px] text-center h-[30px] w-full mt-1">
          {name}
        </div>
      </div>
    </>
  );
}
