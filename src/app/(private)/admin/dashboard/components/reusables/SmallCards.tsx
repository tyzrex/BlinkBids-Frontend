interface SmallCardsProps {
  title: string;
  value: number | string;
}

export default function SmallCards(props: SmallCardsProps) {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              {props.value}
            </span>
            <h3 className="text-base font-normal text-accent-1">
              {props.title}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
