import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="text">
        <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link href="/blog" className="text-base leading-6">
                Blog
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                href="/workspace/storage-usage"
                className="text-base leading-6"
              >
                Billing
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/contact" className="text-base leading-6">
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/privacy" className="text-base leading-6">
                Privacy policy
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/terms" className="text-base leading-6">
                Terms
              </Link>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6 text-primary">
            <a href="#" className="">
              <span className="sr-only">Facebook</span>
              <Facebook />
            </a>
            <a href="#" className="">
              <span className="sr-only">Instagram</span>
              <Instagram />
            </a>
            <a href="#" className="">
              <span className="sr-only">Twitter</span>
              <Twitter />
            </a>
            <a href="https://github.com/Mohamed-lifa7" className="">
              <span className="sr-only">GitHub</span>
              <Github />
            </a>
          </div>
          <p className="mt-8 text-center text-base leading-6 ">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary">Lifa, Inc. </span>All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
