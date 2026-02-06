import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service — SwiftWare Dental",
    description:
        "Terms of Service for SwiftWare Dental. Review our terms and conditions for using our services.",
    alternates: {
        canonical: "https://swiftware.ca/terms",
    },
};

export default function TermsPage() {
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
                        Terms of Service
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
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing and using SwiftWare&apos;s
                                services, you accept and agree to be bound by
                                these Terms of Service. If you do not agree to
                                these terms, please do not use our services.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                2. Services
                            </h2>
                            <p>
                                SwiftWare provides software development, dental
                                marketing, brand design, and automation
                                services. The specific scope of work,
                                deliverables, and timelines will be outlined in
                                individual project agreements.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                3. Client Responsibilities
                            </h2>
                            <p>As a client, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Provide accurate and complete information as
                                    requested
                                </li>
                                <li>
                                    Respond to communications in a timely
                                    manner
                                </li>
                                <li>
                                    Make payments according to agreed-upon
                                    terms
                                </li>
                                <li>
                                    Provide necessary access to systems,
                                    accounts, or materials as needed
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                4. Intellectual Property
                            </h2>
                            <p>
                                Upon full payment, clients receive ownership of
                                custom deliverables created specifically for
                                their project. SwiftWare retains ownership of
                                pre-existing tools, frameworks, and
                                methodologies used in the delivery of services.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                5. Confidentiality
                            </h2>
                            <p>
                                Both parties agree to maintain the
                                confidentiality of proprietary information
                                shared during the course of the engagement.
                                This includes business strategies, technical
                                specifications, and any other sensitive
                                information.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                6. Payment Terms
                            </h2>
                            <p>
                                Payment terms will be specified in individual
                                project agreements. Late payments may result in
                                project delays or suspension of services. All
                                fees are non-refundable unless otherwise
                                specified in writing.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                7. Limitation of Liability
                            </h2>
                            <p>
                                SwiftWare shall not be liable for any indirect,
                                incidental, special, consequential, or punitive
                                damages resulting from your use of our
                                services. Our total liability shall not exceed
                                the amount paid for the specific service in
                                question.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                8. Termination
                            </h2>
                            <p>
                                Either party may terminate services with
                                written notice as specified in the project
                                agreement. Upon termination, the client is
                                responsible for payment of all work completed
                                up to the termination date.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                9. Changes to Terms
                            </h2>
                            <p>
                                We reserve the right to modify these terms at
                                any time. Changes will be effective immediately
                                upon posting to our website. Continued use of
                                our services constitutes acceptance of the
                                modified terms.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                10. Contact Us
                            </h2>
                            <p>
                                If you have any questions about these Terms of
                                Service, please contact us at{" "}
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
