import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | SwiftWare - Enterprise Software Solutions",
  description: "Discover SwiftWare's comprehensive range of enterprise software services including automation, analytics, cloud solutions, and digital transformation.",
};

export default function ServicesPage() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Services</h1>
            <p className="hero-subtitle">
              Comprehensive software solutions designed to transform your business operations
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Business Automation</h3>
              <p>
                Streamline your workflows with intelligent automation solutions that reduce manual tasks 
                and increase operational efficiency across your organization.
              </p>
              <ul>
                <li>Process automation</li>
                <li>Workflow optimization</li>
                <li>Task scheduling</li>
                <li>Integration management</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                </svg>
              </div>
              <h3>Data Analytics</h3>
              <p>
                Transform raw data into actionable insights with our advanced analytics platform 
                that helps you make informed business decisions.
              </p>
              <ul>
                <li>Real-time dashboards</li>
                <li>Predictive analytics</li>
                <li>Custom reporting</li>
                <li>Data visualization</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                  <path d="M12 12v9"/>
                  <path d="m16 16-4-4-4 4"/>
                </svg>
              </div>
              <h3>Cloud Solutions</h3>
              <p>
                Leverage the power of cloud computing with our scalable infrastructure solutions 
                that grow with your business needs.
              </p>
              <ul>
                <li>Cloud migration</li>
                <li>Infrastructure management</li>
                <li>Scalability solutions</li>
                <li>Security implementation</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Custom Development</h3>
              <p>
                Tailored software solutions built specifically for your business requirements 
                and industry-specific challenges.
              </p>
              <ul>
                <li>Custom applications</li>
                <li>API development</li>
                <li>System integration</li>
                <li>Legacy modernization</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Cybersecurity</h3>
              <p>
                Protect your digital assets with comprehensive security solutions that safeguard 
                your data and maintain compliance standards.
              </p>
              <ul>
                <li>Security audits</li>
                <li>Threat detection</li>
                <li>Compliance management</li>
                <li>Incident response</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <h3>Digital Transformation</h3>
              <p>
                Guide your organization through complete digital transformation with strategic 
                planning and implementation support.
              </p>
              <ul>
                <li>Strategy consulting</li>
                <li>Change management</li>
                <li>Technology roadmap</li>
                <li>Training programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Let's discuss how SwiftWare can help you achieve your digital transformation goals.
            </p>
            <a href="/contact" className="cta-button">
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 