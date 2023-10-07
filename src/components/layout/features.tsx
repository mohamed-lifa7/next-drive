const Features = () => {
  return (
    <>
      <section className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
        <h2 className="leadi mb-8 text-center text-4xl font-bold text-primary">
          Why Choose Next Drive?
        </h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} title={feature.title} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Features;

import { features } from "@/constants";
import { Check } from "lucide-react";
import React from "react";

const FeatureCard = ({ title }: { title: string }) => {
  return (
    <>
      <li className="flex items-center space-x-2">
        <Check className="h-5 w-5 text-primary" />
        <span>{title}</span>
      </li>
    </>
  );
};
