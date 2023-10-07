import UploadFile from "@/components/workspace/workspace-dashboard/upload-file";
import AddFolder from "@/components/workspace/workspace-dashboard/add-folder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants";
import { Separator } from "../ui/separator";
const WorkspaceDashboard = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start sm:flex-row ">
        <AddFolder className="mb-4 sm:mb-0 sm:mr-10" />
        <UploadFile />
      </div>
      <div>
        <h3 className="my-4 text-lg font-medium">FAQ</h3>
        <Separator />
        <FaqAccordion />
      </div>
    </>
  );
};

export default WorkspaceDashboard;
function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQ.map((faq) => (
        <AccordionItem value={faq.a} key={faq.q}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
