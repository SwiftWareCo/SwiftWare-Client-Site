import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — SwiftWare Dental",
    description:
        "Privacy Policy for SwiftWare Dental. Learn how we collect, use, and protect your information.",
    alternates: {
        canonical: "https://swiftware.ca/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <section className="relative min-h-screen overflow-hidden pt-40 pb-24 bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,_#dc2626_1px,_transparent_1px),linear-gradient(to_bottom,_#dc2626_1px,_transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(239,68,68,0.16)_0%,_transparent_55%)]" />
            </div>

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 p-8 sm:p-12">
                    <p className="text-sm font-semibold text-sky-600 uppercase tracking-[0.2em]">
                        Legal
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    <div className="mt-10 space-y-8 text-slate-600 leading-relaxed">
                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                1. Information We Collect
                            </h2>
                            <p>
                                We collect information you provide directly to
                                us, such as when you fill out a contact form,
                                schedule a consultation, or communicate with us.
                                This may include:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Name and contact information (email address,
                                    phone number)
                                </li>
                                <li>
                                    Business information (company name, website,
                                    industry)
                                </li>
                                <li>Project requirements and preferences</li>
                                <li>
                                    Any other information you choose to provide
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                2. How We Use Your Information
                            </h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Respond to your inquiries and provide
                                    customer support
                                </li>
                                <li>
                                    Provide, maintain, and improve our services
                                </li>
                                <li>
                                    Send you technical notices and support
                                    messages
                                </li>
                                <li>
                                    Communicate with you about products,
                                    services, and events
                                </li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                3. Information Sharing
                            </h2>
                            <p>
                                We do not sell, trade, or otherwise transfer
                                your personal information to third parties
                                without your consent, except as necessary to
                                provide our services or as required by law.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                4. Data Security
                            </h2>
                            <p>
                                We implement appropriate technical and
                                organizational measures to protect your
                                personal information against unauthorized
                                access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                5. Cookies and Analytics
                            </h2>
                            <p>
                                We use cookies and similar tracking
                                technologies to track activity on our website
                                and hold certain information. We use Google
                                Analytics to help us understand how visitors
                                interact with our website.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                6. Your Rights
                            </h2>
                            <p>
                                You have the right to access, correct, or delete
                                your personal information. You may also opt out
                                of receiving marketing communications from us
                                at any time.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                7. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Privacy
                                Policy, please contact us at{" "}
                                <a
                                    href="mailto:support@swiftware.ca"
                                    className="text-sky-600 font-semibold hover:text-sky-500"
                                >
                                    support@swiftware.ca
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
