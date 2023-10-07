/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type HTMLAttributes, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "@/types/schema";
import type { ProfileFormValues } from "@/types";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { updateUserInformation } from "@/lib/firebase/user-utils";
import UpdateUserPhoto from "../workspace/update-user-photo";
import { defaultAvatar } from "@/constants";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

function isValidUser(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const FormSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
  })
  .refine(
    (data) => {
      if (!isValidUser(data.email)) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid user. Please check your email address.",
    },
  );

function SignInForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }
  const onSubmit = async (userData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const res = await signIn("email", { email: userData.email });

      toast({
        title: "Email Verification",
        description:
          "A magic link has been sent to your email address. Please check your inbox and click the link to verify your email.",
      });

      if (!res?.error) {
        router.push("/");
      } else {
        setErrorMessage("invalid email");
        toast({
          variant: "destructive",
          title: "Error Submitting",
          description: errorMessage,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve();
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          void signIn("github", {
            callbackUrl: "/",
            redirect: false,
          })
            .then(() => {
              router.push("/");
            })
            .catch((_error) => {
              toast({
                variant: "destructive",
                title: "Error Submitting",
                description: errorMessage,
              });
            });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
            redirect: false,
          })
            .then(() => {
              router.push("/");
            })
            .catch((_error) => {
              toast({
                variant: "destructive",
                title: "Error Submitting",
                description: errorMessage,
              });
            });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

function SignOutForm() {
  const router = useRouter();
  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          void signOut({
            callbackUrl: "/",
            redirect: false,
          });
          router.push("/");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (userData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const res = await signIn("email", {
        email: userData.email,
        callbackUrl: "/auth/signin/profile-setup",
      });

      toast({
        title: "Email Verification",
        description:
          "A magic link has been sent to your email address. Please check your inbox and click the link to verify your email.",
      });

      if (!res?.error) {
        router.push("profile-setup");
      } else {
        setErrorMessage("invalid email");
        toast({
          variant: "destructive",
          title: "Error Submitting",
          description: errorMessage,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve();
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create a new account
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          void signIn("github", {
            callbackUrl: "/",
            redirect: false,
          })
            .then(() => {
              router.push("/");
            })
            .catch((_error) => {
              toast({
                variant: "destructive",
                title: "Error Submitting",
                description: errorMessage,
              });
            });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
            redirect: false,
          })
            .then(() => {
              router.push("/");
            })
            .catch((_error) => {
              toast({
                variant: "destructive",
                title: "Error Submitting",
                description: errorMessage,
              });
            });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

const ProfileSetup = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const defaultValues = {
    image: session?.user.image ?? defaultAvatar,
    name: session?.user.name ?? session?.user.email?.split("@")[0],
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    if (!session?.user.id || !data.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Update failed. Please try again later.",
      });
    } else if (session && !data.name && !data.image) {
      void updateUserInformation(session?.user.id, data.name);
    }
    if (session?.user.id && data.name) {
      void updateUserInformation(session.user.id, data.name)
        .then(() => {
          toast({
            title: "Update Successful",
            description: "Update was successful",
          });
          router.push("/");
        })
        .catch((_error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Update failed. Please try again later.",
          });
        });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Jhon Doe"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-[220]">
          <UpdateUserPhoto
            userId={session?.user.id}
            url={defaultValues.image}
          />
        </div>

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};

export { ProfileSetup, SignInForm, SignUpForm, SignOutForm };
