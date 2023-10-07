import { Timer } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const Recent = () => {
  return (
    <Alert>
      <Timer className="h-4 w-4" />
      <AlertTitle>Section Not Implemented</AlertTitle>
      <AlertDescription>
        Sorry, this section of the website is currently under development and
        not yet available.
      </AlertDescription>
    </Alert>
  );
};

export default Recent;
