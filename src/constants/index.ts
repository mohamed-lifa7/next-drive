import type { FeatureProps, TestimonialsProps } from "@/types";
const testimonials: TestimonialsProps[] = [
  {
    id: "1",
    name: "John Doe",
    username: "@johndoe",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F01.png?alt=media&token=ef0f4f87-5610-4410-a9e3-308395820b25",
    content:
      "Next Drive is so bad, it made me want to go back to using floppy disks.",
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "@janesmith",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F02.png?alt=media&token=887b3962-b55d-40d6-b791-64f278da811e",
    content:
      "I'm not sure what's more confusing: Next Drive's user interface, or the instructions on how to use it.",
  },
  {
    id: "3",
    name: "Alice Johnson",
    username: "@alicejohnson",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F03.png?alt=media&token=d7deb651-5cb5-4601-b90c-115b2afcf8c1",
    content:
      "I'm so disappointed with Next Drive, I'm starting to think my dog could design a better cloud storage service.",
  },
  {
    id: "4",
    name: "Bob Anderson",
    username: "@bobanderson",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F05.png?alt=media&token=c369a976-7093-4117-b8fb-0d76f65ad55a",
    content:
      "Next Drive is so buggy, I'm not sure if it's a cloud storage service or a beta test for a new virus.",
  },
  {
    id: "5",
    name: "Eva Wilson",
    username: "@evawilson",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F04.png?alt=media&token=59b1eafe-d4f2-4c50-8fca-816c52855052",
    content: "Google Drive better than that.",
  },
  {
    id: "6",
    name: "Michael Brown",
    username: "@michaelbrown",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F03.png?alt=media&token=d7deb651-5cb5-4601-b90c-115b2afcf8c1",
    content:
      "Next Drive is the only cloud storage service that's guaranteed to make you want to learn how to code so you can build your own.",
  },
];

const features: FeatureProps[] = [
  {
    id: "1",
    title: "Secure and Fast Cloud File Storage",
  },
  {
    id: "2",
    title: "Access Files Anywhere, Even Offline",
  },
  {
    id: "3",
    title: "Effortless File Search and Retrieval",
  },
  {
    id: "4",
    title: "Top-Notch Security to Protect Your Data",
  },
  {
    id: "5",
    title: "Seamless Integrations with Your Favorite Apps",
  },
  {
    id: "6",
    title: "Real-Time Collaborative Work for Teams",
  },
];

const workspaceSidebarNavItems = [
  {
    title: "Dashboard",
    href: "/workspace",
  },
  {
    title: "My Drive",
    href: "/workspace/my-drive",
  },
  {
    title: "Shared with Me",
    href: "/workspace/shared-with-me",
  },
  {
    title: "Recent",
    href: "/workspace/recent",
  },
  {
    title: "Starred",
    href: "/workspace/starred",
  },
  {
    title: "Trash",
    href: "/workspace/trash",
  },
  {
    title: "Storage Usage",
    href: "/workspace/storage-usage",
  },
  {
    title: "Settings",
    href: "/workspace/settings",
  },
];

const SettingsSidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
];

const Links = {
  github: "https://github.com/Mohamed-lifa7/next-drive",
};
const FAQ = [
  {
    q: "Why should I use your drive instead of Google Drive?",
    a: "Because we don't know what 'privacy' means either. Just kidding! We take your privacy seriously, and we won't scan your cat pictures to sell you cat food.",
  },
  {
    q: " Do you have unlimited storage space?",
    a: "Yes, it's unlimited, just like the number of times you've said you'll start organizing your files tomorrow.",
  },
  {
    q: "How secure is my data?",
    a: " We have a team of ninjas guarding your data. Just kidding! We use advanced encryption techniques to keep your data safe.",
  },
  {
    q: "Can I upload my embarrassing high school photos?",
    a: "Absolutely! We believe in preserving awkward memories for future generations to enjoy.",
  },
  {
    q: "Do you offer a 'Messy Folder' option for my chaotic friends?",
    a: "Unfortunately, no. But you can create as many messy folders as you want on your own.",
  },
  {
    q: "Can I share files with my arch-nemesis?",
    a: "Of course! We believe in promoting peaceful file sharing.",
  },
  {
    q: "What's your customer support response time?",
    a: "We aim for 'as fast as lightning,' but sometimes it's more like 'as fast as a sloth on a coffee break.'",
  },
];

const defaultAvatar =
  "https://firebasestorage.googleapis.com/v0/b/next-drive-62347.appspot.com/o/avatars%2F04.png?alt=media&token=59b1eafe-d4f2-4c50-8fca-816c52855052&_gl=1*t5gs26*_ga*NzExNDU5NDAxLjE2ODc2MjgzMDI.*_ga_CW55HF8NVT*MTY5NjUwNDI2OS4xMzQuMS4xNjk2NTA2MTY3LjQwLjAuMA..";
export {
  testimonials,
  features,
  workspaceSidebarNavItems,
  SettingsSidebarNavItems,
  Links,
  FAQ,
  defaultAvatar,
};
