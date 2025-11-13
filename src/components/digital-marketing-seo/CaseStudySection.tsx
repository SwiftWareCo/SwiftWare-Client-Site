"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const CaseStudySection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            Your Silver Bullet
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Case Study: How SEO Took Vancouver Hood Doctors from 0 to 10,000
            Monthly Visitors
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This is all about marketing. We show the &quot;Before &
              After&quot; of their Google ranking, display a chart of their
              website traffic growth, and showcase their professional Instagram
              feed.
            </p>
            <div className="mt-8 w-full rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                The Result
              </p>
              <p className="mt-2 text-lg text-blue-600 dark:text-blue-400">
                Grew from 0 to 10,000 monthly visitors in 6 months, generating
                an average of 150 qualified leads per month.
              </p>
            </div>
            <Button size="lg" className="mt-8 group">
              See the Full Transformation (All Services)
              <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="relative h-80 w-full lg:h-96">
            {/* Placeholder for Before/After chart or Instagram screenshot */}
            <Image
              src="/images/vhd-demo.jpg" // Using an existing relevant image as placeholder
              alt="Vancouver Hood Doctors Case Study"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold text-xl">Vancouver Hood Doctors</p>
              <p>Digital Marketing & SEO Transformation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
