import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Shield, Smartphone, CreditCard } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "offline-mode",
    question: "Does it work offline?",
    answer: "Yes. The mobile app caches jobs and syncs when online. Field technicians can create work orders, capture photos, and log time even without internet connectivity.",
    icon: Smartphone
  },
  {
    id: "payment-integration",
    question: "Can we integrate payments?",
    answer: "Yes. We can add Stripe or your preferred provider. Accept payments on-site via the mobile app, automatically reconcile invoices, and track payment status in real-time.",
    icon: CreditCard
  },
  {
    id: "customization",
    question: "How customizable is the system?",
    answer: "Highly customizable. We build on your specific workflows, not the other way around. Custom fields, business logic, integrations, and reporting are all standard.",
    icon: Shield
  },
  {
    id: "support",
    question: "What kind of support do you provide?",
    answer: "Ongoing support included. We provide training, documentation, bug fixes, feature requests, and performance optimization as part of our service.",
    icon: Smartphone
  },
  {
    id: "timeline",
    question: "What's the typical timeline for implementation?",
    answer: "Most projects are completed within 4-8 weeks. This includes discovery, design, development, testing, and deployment. We work in weekly sprints with regular check-ins to ensure we're meeting your needs.",
    icon: Shield
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 size-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-80 bg-purple-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Everything you need to know about our CRM solution for field service businesses.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            const isOpen = openItems.has(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-blue-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        id={`faq-answer-${item.id}`}
                        className="p-6 rounded-2xl border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-sm border-t-0 rounded-t-none"
                      >
                        <p className="text-zinc-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


