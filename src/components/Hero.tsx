'use client';

export default function Hero() {
  const text = "SwiftWare's comprehensive software solutions. From automation to analytics, we help companies achieve digital transformation and operational excellence.";
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Transform Your <br />
            <span className="highlight">Business Operations</span>
          </h1>
          <p>
            {text}
          </p>
          <button className="btn btn-primary">
            <span>Get Started →</span>
          </button>
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Cloud-Based Solutions</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Enterprise Security</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="stats-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="enterprise-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Enterprise Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
} 