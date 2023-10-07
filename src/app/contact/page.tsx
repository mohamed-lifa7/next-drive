import FeedbackForm from "@/components/others/feedback-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
const Contact = () => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:grid-cols-2 lg:px-8">
      <div className="flex flex-col justify-between lg:pt-8">
        <div className="mb-6">
          <p className="tracking-loose ml-6 text-lg uppercase">REVIEW</p>
          <p className="my-4 text-3xl leading-relaxed text-primary md:text-5xl md:leading-snug">
            Leave us a feedback!
          </p>
          <p className="text-sm leading-snug text-muted-foreground text-opacity-100 md:text-base">
            Please provide your valuable feedback and something something ...
          </p>
        </div>
        <div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>
              This form is for providing general feedback. If you need to report
              a bug or issue, please do so on our GitHub issues page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <FeedbackForm />
    </div>
  );
};

export default Contact;
