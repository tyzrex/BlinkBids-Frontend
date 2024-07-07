interface Props {
  description: string;
}

export default function ProductDescription(props: Props) {
  return (
    <div className="my-10">
      <h2 className="title-typography">Description</h2>
      <div className="text-gray-600 mt-2">
        <div
          dangerouslySetInnerHTML={{ __html: props?.description }}
          className="my-5 product-description  overflow-auto"
        ></div>
      </div>
    </div>
  );
}
