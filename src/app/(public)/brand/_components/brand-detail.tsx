export default function BrandDetail({ details }: { details: string }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: details }}></div>
    </>
  );
}
