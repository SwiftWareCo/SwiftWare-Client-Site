"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";

const faqs = [
    {
        question: "How quickly will I see results?",
        answer: "Most clients see measurable improvements within the first 30 days. SEO typically takes 3-6 months for significant ranking improvements, but our social media and paid advertising can start bringing patients within the first week. Our automated booking system starts working immediately once set up.",
    },
    {
        question:
            "What makes your service different from other dental marketing agencies?",
        answer: "Three things: First, we're fully automated—our SEO optimization, blog generation, and patient reminders run 24/7 without you lifting a finger. Second, we cover ALL platforms (Instagram, TikTok, Facebook, LinkedIn, Pinterest) rather than just one or two. Third, we don't just get patients—we keep them loyal with our retention systems.",
    },
    {
        question: "How does the automated blog generation work?",
        answer: "Our AI system scans keywords patients in your area are searching for weekly. It then generates SEO-optimized, medically accurate blog content tailored to those searches. Every article is reviewed for quality and published automatically to your website, keeping your site fresh and climbing the rankings.",
    },
    {
        question: "Is the booking system HIPAA compliant?",
        answer: "Absolutely. Our entire platform is built with HIPAA compliance in mind. All patient data is encrypted, securely stored, and handled according to healthcare privacy regulations. We provide BAA (Business Associate Agreement) documentation upon request.",
    },
    {
        question: "What if I already have a website?",
        answer: "We can work with your existing website! We'll audit it for SEO performance and user experience, then integrate our systems. However, if your current site isn't performing well, we may recommend a redesign to maximize your results—we'll be upfront about what will give you the best ROI.",
    },
    {
        question: "How much time will I need to spend on this?",
        answer: "Almost none—that's the beauty of our automated systems. After an initial 1-2 hour onboarding call to understand your practice, everything runs automatically. You'll receive monthly reports and can check your dashboard anytime, but there's no daily management required from you.",
    },
    {
        question: "Do you work with practices outside of BC?",
        answer: "Yes! While we're based in BC and have deep expertise in the local market, our systems work for dental practices across Canada and the US. Local SEO strategies are customized for your specific area.",
    },
    {
        question: "What is the pricing structure?",
        answer: "We offer flexible packages based on your needs and practice size. Our complete growth package includes website, SEO, social media, and patient retention systems. We're transparent about pricing—book a free strategy call and we'll give you exact numbers based on your goals.",
    },
];

// Individual FAQ item
function FAQItem({
    faq,
    isOpen,
    onToggle,
    index,
}: {
    faq: (typeof faqs)[0];
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-slate-200 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="cursor-pointer w-full flex items-center justify-between py-6 text-left group"
            >
                <span
                    className={`font-medium text-lg transition-colors ${
                        isOpen
                            ? "text-sky-600"
                            : "text-slate-900 group-hover:text-sky-600"
                    }`}
                >
                    {faq.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                            ? "bg-sky-100"
                            : "bg-slate-100 group-hover:bg-sky-50"
                    }`}
                >
                    <ChevronDown
                        className={`h-5 w-5 transition-colors ${
                            isOpen ? "text-sky-600" : "text-slate-500"
                        }`}
                    />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function DentistFAQSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            ref={ref}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px),
                              linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="mx-auto max-w-4xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 mb-6 shadow-sm">
                        <HelpCircle className="h-4 w-4 text-sky-600" />
                        <span className="text-sm font-medium text-slate-700">
                            Frequently Asked Questions
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Got Questions?{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            We&apos;ve Got Answers
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600">
                        Everything you need to know about growing your dental
                        practice with SwiftWare.
                    </p>
                </motion.div>

                {/* FAQ list */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 px-8"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        />
                    ))}
                </motion.div>

                {/* Still have questions? */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-sky-200 px-6 py-4 shadow-lg">
                        <MessageCircle className="h-5 w-5 text-sky-600" />
                        <span className="text-slate-700">
                            Still have questions?{" "}
                            <button
                                onClick={() => openCalendlyPopup()}
                                className="cursor-pointer font-semibold text-sky-600 hover:text-sky-700"
                            >
                                Book a free call with us
                            </button>
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
