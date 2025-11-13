"use client";
import { Button } from "@/components/ui/button";

export const FinalCTASection = () => {
  return (
    <section className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to Own Your Local Market?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
          Schedule your free, no-obligation consultation today. We&apos;ll show
          you exactly what your competitors are doing and build a custom plan to
          beat them.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary">
            Schedule My Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
