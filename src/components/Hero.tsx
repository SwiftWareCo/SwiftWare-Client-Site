'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            <span>Transform Your</span> <br />
            <span className="highlight">Business Operations</span>
          </h1>
          <p>
            Transforming business operations with intelligent software solutions
          </p>
          <p>
            From custom CRM systems to AI-powered mobile apps, we build software that streamlines your operations, boosts productivity, and drives sustainable growth.
          </p>
          <div className="hero-buttons">
            <Link href="/contact" className="btn btn-primary">
              <span>Get Started →</span>
            </Link>
            <Link href="/services" className="btn btn-secondary">
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="stats-container">
            <div className="stats-card">
              <div className="stat-number purple-text">Vancouver</div>
              <div className="stat-label">Based Team</div>
            </div>
            <div className="enterprise-card">
              <div className="stat-number green-text">24hr</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 