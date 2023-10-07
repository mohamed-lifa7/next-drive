import type { Metadata } from "next";

export const siteConfig:Metadata = {
    metadataBase: new URL("https://nextdrive.vercel.app"),
    title: {
      default: "Next Drive - Elevate Your Data Storage Experience",
      template: "%s | Next Drive",
    },
    description:
      "Discover Next Drive, the ultimate cloud storage solution. Store, sync, and secure your files with ease. Experience hassle-free data access and sharing, backed by top-tier security features. Join us and embrace the future of digital storage today.",
    openGraph: {
      title: "Next Drive - Elevate Your Data Storage Experience",
      description:
        "Discover Next Drive, the ultimate cloud storage solution. Store, sync, and secure your files with ease. Experience hassle-free data access and sharing, backed by top-tier security features. Join us and embrace the future of digital storage today.",
      url: new URL("https://nextdrive.vercel.app"),
      siteName: "Next Drive",
      locale: "en-DZ",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: "Next Drive - Elevate Your Data Storage Experience",
      card: "summary_large_image",
    },
    keywords: [
        "cloud storage",
        "data storage",
        "file synchronization",
        "secure file storage",
        "online file sharing",
        "digital data",
        "data security",
        "cloud storage solution",
        "hassle-free storage",
        "future of storage",
        "Next Drive",
      ],
}