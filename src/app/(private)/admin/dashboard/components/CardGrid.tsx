import SmallCards from "./reusables/SmallCards";

interface ICardGridProps {
  count: number;
  bookingCount: number;
  earning: number;
}

export default function CardGrid(props: ICardGridProps) {
  return (
    <>
      <div className="">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SmallCards title="Pending Orders" value={props.count} />
          <SmallCards title="Pending Emi Request" value={props.bookingCount} />
          <SmallCards
            title="Pending Vendor Request"
            value={`Rs. ${props.earning}`}
          />
        </div>
      </div>
    </>
  );
}
