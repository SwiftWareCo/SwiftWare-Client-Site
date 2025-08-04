'use client';

import { useState } from 'react';

export default function ClientShowcase() {
  const [activeClient, setActiveClient] = useState(0);

  const clients = [
    { name: 'TechCorp', category: 'Technology', avatar: 'TC', 
      color: '#6366F1',
      content: {
        title: 'Digital Transformation Success',
        description: 'Streamlined operations and increased efficiency by 40% through our comprehensive automation platform.',
        image: 'Project Alpha Dashboard'
      }
    },
    { name: 'InnovateLabs', category: 'Innovation', avatar: 'IL', 
      color: '#8B5CF6',
      content: {
        title: 'Innovation Platform',
        description: 'Accelerated product development cycles and enhanced collaboration across distributed teams.',
        image: 'Innovation Hub Interface'
      }
    },
    { name: 'GreenTech', category: 'Sustainability', avatar: 'GT', 
      color: '#10B981',
      content: {
        title: 'Sustainable Operations',
        description: 'Reduced carbon footprint by 30% while optimizing resource allocation and operational efficiency.',
        image: 'Sustainability Dashboard'
      }
    },
    { name: 'DataDriven', category: 'Analytics', avatar: 'DD', 
      color: '#A855F7',
      content: {
        title: 'Advanced Analytics',
        description: 'Transformed raw data into actionable insights, driving strategic decision-making.',
        image: 'Analytics Platform'
      }
    },
    { name: 'ScaleUp', category: 'Growth', avatar: 'SU', 
      color: '#6366F1',
      content: {
        title: 'Rapid Scaling Solution',
        description: 'Enabled 300% growth while maintaining operational excellence and customer satisfaction.',
        image: 'Growth Management System'
      }
    },
    { name: 'SecureFlow', category: 'Security', avatar: 'SF', 
      color: '#10B981',
      content: {
        title: 'Enterprise Security',
        description: 'Implemented comprehensive security framework with zero breaches in 2+ years.',
        image: 'Security Operations Center'
      }
    },
  ];

  const handleClientHover = (index: number) => {
    setActiveClient(index);
  };

  return (
    <section className="client-section">
      <div className="container">
        <h2>Powering Success</h2>
        <p className="subtitle">Across Industries</p>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#64748B' }}>
          Join thousands of companies worldwide who trust SwiftWare to streamline their 
          operations, boost productivity, and drive digital transformation.
        </p>

        <div className="client-grid">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className={`client-item ${activeClient === index ? 'client-item-active' : ''}`}
              onMouseEnter={() => handleClientHover(index)}
            >
              <div 
                className="client-avatar" 
                style={{ backgroundColor: client.color }}
              >
                {client.avatar}
              </div>
              <div className="client-name">{client.name}</div>
              <div className="client-category">{client.category}</div>
            </div>
          ))}
        </div>

        <div className="showcase">
          <div className="showcase-image" style={{ background: `linear-gradient(135deg, ${clients[activeClient].color} 0%, ${clients[activeClient].color}CC 100%)` }}>
            <div>
              <h3 style={{ color: 'white', margin: 0 }}>{clients[activeClient].name}</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: '0.5rem 0 0 0' }}>{clients[activeClient].category} Platform</p>
            </div>
          </div>
          <div className="showcase-content">
            <h3>{clients[activeClient].name}</h3>
            <p style={{ color: clients[activeClient].color, fontWeight: '600', marginBottom: '1rem' }}>{clients[activeClient].category}</p>
            <p>{clients[activeClient].content.description}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Key Results</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>{clients[activeClient].content.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 