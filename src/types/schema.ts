import { z } from "zod"


const profileFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "full name must be at least 2 characters.",
      })
      .max(30, {
        message: "full name must not be longer than 30 characters.",
      })
      .optional()
      .nullable(),
      image:z
      .string()
      .optional()
      .nullable(),
  });


const feedbackFormSchema = z.object({
    subject: z
      .string()
      .min(4, 'The subject should be at least 4 letters')
      .max(50, 'Subject cannot exceed 50 characters')
      .nonempty('Subject is required'),
    message: z
      .string()
      .min(30, 'Message should have at least 30 characters')
      .max(1000, 'Message cannot exceed 1000 characters')
      .nonempty('Message is required'),
  });


export {
    profileFormSchema,
    feedbackFormSchema,
}

