"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle } from "lucide-react";

const faqs = [
  {
    question:
      "I'm a [Plumber/Roofer/Electrician]. How does my business even work with a social media (SMMA) agency?",
    answer: (
      <div className="space-y-4">
        <p>
          This is our specialty. We know you&apos;re busy on-site, not at a
          computer. Our entire process is built to take 99% of the work off your
          plate. We make content easy:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span>
              <strong className="text-gray-900 dark:text-white">
                We Come to You (Optional):
              </strong>{" "}
              We can schedule a single 2-hour visit to your job sites each
              month. Our team captures all the professional photos and video
              clips we need for the entire month.
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span>
              <strong className="text-gray-900 dark:text-white">
                You Send, We Edit:
              </strong>{" "}
              See a great &apos;before-and-after&apos;? Just take a quick, raw
              video on your phone and text it to us. Our team will
              professionally edit it, add your logo, write a caption, and post
              it.
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span>
              <strong className="text-gray-900 dark:text-white">
                We Handle the Rest:
              </strong>{" "}
              We create all the branded graphics, seasonal tips (e.g., &quot;How
              to prevent frozen pipes&quot;), and promotions.
            </span>
          </li>
        </ul>
        <p className="font-medium text-gray-800 dark:text-gray-200">
          You just give us a simple &quot;looks good&quot; in a text or email,
          and we handle the rest.
        </p>
      </div>
    ),
  },
  {
    question:
      "Why would my trade business need videos? That seems worthless and won't generate revenue.",
    answer: (
      <div className="space-y-4">
        <p>
          That&apos;s a fair question. The truth is, videos are the single most
          powerful way to build trust before a customer calls you.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong className="text-gray-900 dark:text-white">
              It&apos;s Proof of Work:
            </strong>{" "}
            A customer seeing a video of your team successfully installing a new
            water heater proves you know what you&apos;re doing. It&apos;s 100x
            more powerful than a simple photo.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">
              It Answers Questions:
            </strong>{" "}
            A 30-second video on &quot;How to spot a roof leak&quot; makes you
            the #1 expert in a potential customer&apos;s mind.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">
              It Shows You&apos;re Real:
            </strong>{" "}
            Seeing your team and your trucks humanizes your business. Customers
            feel like they &quot;know you&quot; and are more likely to call you
            over a faceless competitor.
          </li>
        </ul>
        <p className="font-semibold text-gray-800 dark:text-gray-200">
          Our goal isn&apos;t to make &apos;worthless&apos; videos; it&apos;s to
          create trust-building assets that directly lead to more,
          higher-quality job requests.
        </p>
      </div>
    ),
  },
  {
    question: "How long until I see results from SEO?",
    answer:
      "SEO is a long-term investment. While you can see some results in as little as 3 months, the real, game-changing traffic (where you dominate Page 1) typically takes 6-12 months of consistent effort. This is why we often pair our SEO strategy with Paid Ads for the first few months. Ads get you leads tomorrow while we build your long-term SEO 'engine' in the background.",
  },
  {
    question: "How do I know if any of this is actually working?",
    answer:
      "We believe in 100% transparency. You'll receive a simple, easy-to-read report from us every month. It won't be filled with confusing jargon. It will show you: How many people visited your site, how many calls you got from Google, and how many forms were filled out. We track everything and tie our work directly to your revenue.",
  },
];

const accordionVariants = {
  open: { opacity: 1, height: "auto" }, // Shows the answer at full height.
  collapsed: { opacity: 0, height: 0 }, // Hides content while collapsing the panel.
};

export const ServiceSpecificFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Answering the Skeptic
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We understand the unique challenges of marketing a trade business.
            Here are answers to your most pressing questions.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full cursor-pointer px-6 py-4 text-left flex items-center justify-between"
              >
                <h3 className="pr-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-6 w-6 flex-shrink-0 text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{
                      duration: 0.4, // Sets expansion/collapse speed for the FAQ.
                      ease: [0.04, 0.62, 0.23, 0.98], // Mimics a natural spring easing.
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-base text-gray-700 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
