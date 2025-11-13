"use client";
import { CheckCircle, XCircle } from "lucide-react";

export const ProblemSolutionSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-lg border border-red-500/20 bg-red-50/50 p-8 dark:bg-red-900/10">
            <div className="flex items-center">
              <XCircle className="h-10 w-10 text-red-500" />
              <h3 className="ml-4 text-2xl font-bold text-red-900 dark:text-red-200">
                The Problem
              </h3>
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Your biggest competitor is getting all the calls... not because
              they&apos;re better, but because they&apos;re seen. An invisible
              business, a quiet phone, and a schedule with &apos;gaps&apos; are all
              symptoms of a broken or non-existent marketing system.
            </p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-50/50 p-8 dark:bg-green-900/10">
            <div className="flex items-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <h3 className="ml-4 text-2xl font-bold text-green-900 dark:text-green-200">
                The Solution
              </h3>
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We make you the obvious, most-trusted choice online. We use proven
              SEO to get you on Page 1 of Google and smart social media to build
              trust before they even call. The result? A full schedule and
              predictable growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
