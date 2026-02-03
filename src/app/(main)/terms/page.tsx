import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — SwiftWare',
  description: 'Terms of Service for SwiftWare. Read our terms and conditions for using our services.',
};

export default function TermsPage() {
  return (
    <main className='min-h-screen bg-background pt-32 pb-20'>
      <div className='mx-auto max-w-3xl px-6'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>Terms of Service</h1>

        <div className='prose prose-invert prose-zinc max-w-none'>
          <p className='text-muted-foreground text-lg mb-8'>
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>1. Acceptance of Terms</h2>
            <p className='text-muted-foreground'>
              By accessing and using SwiftWare&apos;s services, you accept and agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>2. Services</h2>
            <p className='text-muted-foreground'>
              SwiftWare provides software development, digital marketing, brand design, and automation
              services. The specific scope of work, deliverables, and timelines will be outlined in
              individual project agreements.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>3. Client Responsibilities</h2>
            <p className='text-muted-foreground mb-4'>
              As a client, you agree to:
            </p>
            <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
              <li>Provide accurate and complete information as requested</li>
              <li>Respond to communications in a timely manner</li>
              <li>Make payments according to agreed-upon terms</li>
              <li>Provide necessary access to systems, accounts, or materials as needed</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>4. Intellectual Property</h2>
            <p className='text-muted-foreground'>
              Upon full payment, clients receive ownership of custom deliverables created specifically
              for their project. SwiftWare retains ownership of pre-existing tools, frameworks, and
              methodologies used in the delivery of services.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>5. Confidentiality</h2>
            <p className='text-muted-foreground'>
              Both parties agree to maintain the confidentiality of proprietary information shared
              during the course of the engagement. This includes business strategies, technical
              specifications, and any other sensitive information.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>6. Payment Terms</h2>
            <p className='text-muted-foreground'>
              Payment terms will be specified in individual project agreements. Late payments may
              result in project delays or suspension of services. All fees are non-refundable unless
              otherwise specified in writing.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>7. Limitation of Liability</h2>
            <p className='text-muted-foreground'>
              SwiftWare shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our services. Our total liability shall not
              exceed the amount paid for the specific service in question.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>8. Termination</h2>
            <p className='text-muted-foreground'>
              Either party may terminate services with written notice as specified in the project
              agreement. Upon termination, the client is responsible for payment of all work completed
              up to the termination date.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>9. Changes to Terms</h2>
            <p className='text-muted-foreground'>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to our website. Continued use of our services constitutes
              acceptance of the modified terms.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>10. Contact Us</h2>
            <p className='text-muted-foreground'>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href='mailto:support@swiftware.ca' className='text-blue-400 hover:text-blue-300'>
                support@swiftware.ca
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
