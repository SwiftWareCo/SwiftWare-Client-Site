'use client';

export default function Features() {
  const stats = [
    { number: '500+', label: 'Happy Clients', color: '#10B981' },
    { number: '1000+', label: 'Projects Completed', color: '#6366F1' },
    { number: '99.9%', label: 'Uptime Guarantee', color: '#6366F1' },
    { number: '24/7', label: 'Support Available', color: '#1E293B' },
  ];

  const features = [
    {
      title: 'Cloud-First Solutions',
      description: 'Scalable, secure cloud infrastructure that grows with your business needs and adapts to changing demands.',
      color: '#10B981',
      icon: '☁️'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption, compliance standards, and advanced threat protection.',
      color: '#6366F1',
      icon: '🔒'
    },
    {
      title: 'Smart Automation',
      description: 'Intelligent automation solutions to streamline processes, reduce costs, and accelerate growth.',
      color: '#8B5CF6',
      icon: '⚡'
    },
    {
      title: 'Expert Support',
      description: 'Dedicated technical support team available around the clock to ensure seamless operations.',
      color: '#1E293B',
      icon: '👥'
    },
  ];

  return (
    <>
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="stat-icon" 
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.number.includes('+') ? '📊' : stat.number.includes('%') ? '⚡' : '🎯'}
                </div>
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose SwiftWare?</h2>
          <p className="subtitle">
            We combine innovation, security, and reliability to create software solutions that 
            transform your business operations and drive sustainable growth.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div 
                  className="feature-icon" 
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 