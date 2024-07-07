import { getPageDetail } from "@/api/homeApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { goTry } from "go-go-try";

export default async function FAQ() {
  const [error, pageDetail] = await goTry(getPageDetail("Home"));
  if (error || !pageDetail) {
    return <></>;
  }

  return (
    <>
      <section className="mx-auto my-10">
        <span className="title-typography mb-5">
          Know more about FatafatSewa?
        </span>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="bg-white">
            <AccordionTrigger>Know more about FatafatSewa?</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{ __html: pageDetail.content }}
              ></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
