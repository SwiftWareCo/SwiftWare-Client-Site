'use client';

export default function Features() {
  const features = [
    {
      title: 'Custom Development',
      description: 'Tailored websites, CRM systems, and mobile apps built specifically for your business needs and industry requirements.',
      color: '#6366F1',
      icon: '💻'
    },
    {
      title: 'End-to-End Service',
      description: 'From initial consultation to ongoing maintenance, we handle everything so you can focus on running your business.',
      color: '#6366F1',
      icon: '🔄'
    },
    {
      title: 'Ongoing Updates',
      description: 'Regular website updates, feature enhancements, and technical support to keep your systems running smoothly.',
      color: '#6366F1',
      icon: '🔧'
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2>Why Choose SwiftWare?</h2>
        <p className="subtitle">
          We specialize in building custom websites, CRM systems, and mobile apps that streamline your operations and help your business grow efficiently.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
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
  );
} 