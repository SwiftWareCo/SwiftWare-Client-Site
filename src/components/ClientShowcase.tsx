'use client';

import { useState } from 'react';

export default function ClientShowcase() {
  const clients = [
    { 
      name: 'TechCorp', 
      category: 'Technology', 
      initials: 'TE', 
      color: '#6366F1',
      description: 'Cloud infrastructure modernization and advanced analytics platform',
      results: '40% faster deployment, 60% cost reduction'
    },
    { 
      name: 'GlobalFinance', 
      category: 'Finance', 
      initials: 'GF', 
      color: '#1E293B',
      description: 'Secure trading platform with real-time market data integration',
      results: '99.9% uptime, $2M+ transactions daily'
    },
    { 
      name: 'HealthPlus', 
      category: 'Healthcare', 
      initials: 'HP', 
      color: '#10B981',
      description: 'Patient management system with telehealth capabilities',
      results: '50K+ patients managed, 30% efficiency gain'
    },
    { 
      name: 'RetailMax', 
      category: 'Retail', 
      initials: 'RM', 
      color: '#6366F1',
      description: 'E-commerce platform with inventory management and analytics',
      results: '200% sales increase, 45% faster checkout'
    },
    { 
      name: 'EduTech', 
      category: 'Education', 
      initials: 'ET', 
      color: '#1E293B',
      description: 'Learning management system with interactive course builder',
      results: '1M+ students, 95% completion rate'
    },
    { 
      name: 'ManufacturingPro', 
      category: 'Manufacturing', 
      initials: 'MP', 
      color: '#10B981',
      description: 'IoT-enabled production monitoring and quality control system',
      results: '25% efficiency boost, 90% defect reduction'
    },
  ];

  const [selectedClient, setSelectedClient] = useState(0);

  const handleClientHover = (index: number) => {
    setSelectedClient(index);
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
              className={`client-item ${selectedClient === index ? 'client-item-active' : ''}`}
              onMouseEnter={() => handleClientHover(index)}
            >
              <div 
                className="client-avatar" 
                style={{ backgroundColor: client.color }}
              >
                {client.initials}
              </div>
              <div className="client-name">{client.name}</div>
              <div className="client-category">{client.category}</div>
            </div>
          ))}
        </div>

        <div className="showcase">
          <div className="showcase-image" style={{ background: `linear-gradient(135deg, ${clients[selectedClient].color} 0%, ${clients[selectedClient].color}CC 100%)` }}>
            <div>
              <h3 style={{ color: 'white', margin: 0 }}>{clients[selectedClient].name}</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: '0.5rem 0 0 0' }}>{clients[selectedClient].category} Platform</p>
            </div>
          </div>
          <div className="showcase-content">
            <h3>{clients[selectedClient].name}</h3>
            <p style={{ color: clients[selectedClient].color, fontWeight: '600', marginBottom: '1rem' }}>{clients[selectedClient].category}</p>
            <p>{clients[selectedClient].description}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Key Results</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>{clients[selectedClient].results}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 