import { Button } from "@/components/ui/button";
import { Links } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GetStartedButtons } from "../auth/auth-buttons";
const Hero = () => {
  return (
    <>
      <div>
        <div className="mb-2">
          <Badge variant="destructive">
            Please Avoid Uploading Sensitive Data
          </Badge>
        </div>
        <div>
          <Badge variant="secondary">
            Rest assured, we employ a secure third-party authentication system.
          </Badge>
        </div>
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="mb-16 flex flex-col sm:mb-0 sm:text-center">
              <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
                <h2 className="font-sans mb-6 max-w-lg text-3xl font-bold leading-none tracking-tight text-primary sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                    >
                      <defs>
                        <pattern
                          id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <span className="relative">Next Drive</span>
                  </span>{" "}
                  Your Digital Oasis for Effortless Collaboration
                </h2>
                <p className="text-base md:text-lg">
                  Welcome to Next Drive, where seamless collaboration meets
                  unparalleled security. Unleash the potential of your digital
                  world today!
                </p>
              </div>
              <div className="flex items-center md:justify-center">
                <GetStartedButtons />
                <Button asChild variant="outline">
                  <Link href={Links.github} aria-label="Github repo">
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
