"use client";
import Icon from "@/components/ui/Icon";

const features = [
  {
    name: "Local SEO",
    description: "Getting you found on Google Maps and in local searches.",
    iconName: "MapPin",
  },
  {
    name: "Content Marketing",
    description: "Blog posts and videos that prove your expertise.",
    iconName: "FileText",
  },
  {
    name: "Social Media (SMMA)",
    description: "Building your brand and trust on Instagram & Facebook.",
    iconName: "ThumbsUp",
  },
  {
    name: "Paid Ads (PPC)",
    description: "Running targeted Google & Facebook ads for immediate leads.",
    iconName: "Target",
  },
  {
    name: "Reputation Management",
    description: "Helping you get and showcase 5-star reviews.",
    iconName: "Star",
  },
  {
    name: "Analytics & Reporting",
    description: "Transparent reports showing what's working and why.",
    iconName: "BarChart2",
  },
] as const;

export const WhatsIncludedSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            The Engine Parts
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What&apos;s Included in Your Marketing Engine
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We provide a comprehensive suite of services designed to work
            together, creating a powerful, lead-generating system for your
            business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <Icon
                    name={feature.iconName}
                    className="h-8 w-8 flex-none rounded-lg bg-blue-600 p-1.5 text-white"
                    aria-hidden={true}
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
