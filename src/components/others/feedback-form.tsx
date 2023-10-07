"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import type { FeedbackProps } from "@/types";
import { feedbackFormSchema } from "@/types/schema";
import { useSession } from "next-auth/react";
import { addFeedback } from "@/lib/firebase/others-utils";

export default function FeedbackForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const feedbackForm = useForm<FeedbackProps>({
    resolver: zodResolver(feedbackFormSchema),
    mode: "onChange",
  });
  const submitFeedbackForm = (data: FeedbackProps) => {
    if (!session?.user.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be signed in to submit feedback.",
        action: <ToastAction altText="Sign in">Sign in</ToastAction>,
      });
      return;
    } else if (!data) {
      // This should not happen due to zod validation, but providing a fallback message
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was an error submitting your feedback. Please ensure all fields are filled out correctly and try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    data.email = session?.user.email;
    void addFeedback(data)
      .then(() => {
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback. We appreciate your input!",
        });
        router.push("/");
      })
      .catch((_error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Sorry, an error occurred while submitting your feedback. Please try again later.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>
          We value your input! Please take a moment to provide us with your
          feedback to help us improve our services.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-4 md:p-6">
        <Form {...feedbackForm}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={feedbackForm.handleSubmit(submitFeedbackForm)}
            className="w-full space-y-8"
          >
            <FormField
              control={feedbackForm.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={feedbackForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How we can help?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback fuels our growth! Tell us what you think, and we'll use it to enhance our platform"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
