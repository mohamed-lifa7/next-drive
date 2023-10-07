import { Button } from "@/components/ui/button";
import { Links } from "@/constants";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const Pricing = () => {
  return (
    <>
      <section className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
        <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
          <h2 className="mb-4 text-center text-4xl font-bold leading-none text-primary">
            Transparent pricing plans
          </h2>
        </div>
        <div className="flex flex-col text-center">
          <p className="mb-4">
            Sorry, we couldn&apos;t find any pricing plans because this project
            is open source and totally free! It&apos;s so free that even our
            imaginary pricing is non-existent.
          </p>
          <div>
            <Button asChild className="mb-4 md:mr-2">
              <Link
                href={Links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StarFilledIcon className="mr-2 h-4 w-4" />
                Give us a star
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link
                href="https://donate.example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  height="16"
                  viewBox="0 0 32 32"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path d="m9.197 0-1.619 3.735h-2.407v3.359h.921l.943 5.975h-1.473l1.948 10.973 1.249-.015 1.256 7.973h11.891l.083-.531 1.172-7.443 1.188.015 1.943-10.973h-1.407l.937-5.975h1.011v-3.359h-2.557l-1.625-3.735zm.704 1.073h12.057l1.025 2.375h-14.115zm-3.666 3.73h19.525v1.228h-19.525zm.604 9.333h18.183l-1.568 8.823-7.536-.079-7.511.079z" />
                </svg>{" "}
                Buy me a coffee
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
