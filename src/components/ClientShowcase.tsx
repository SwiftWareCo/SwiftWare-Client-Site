'use client';

import { useState } from 'react';

export default function ClientShowcase() {
  const [activeClient, setActiveClient] = useState(0);

  const clients = [
    { 
      name: 'EduLink', 
      category: 'Education Technology', 
      avatar: 'EL', 
      color: '#6366F1',
      content: {
        title: 'AI-powered platform connecting teachers and students with intelligent features for private schools. Enhanced learning experiences through seamless communication.',
        description: 'AI-powered platform connecting teachers and students with intelligent features for private schools. Enhanced learning experiences through seamless communication.'
      }
    },
    { 
      name: 'Vancouver Hood Doctors', 
      category: 'Service Management', 
      avatar: 'VH', 
      color: '#8B5CF6',
      content: {
        title: 'Complete CRM solution with client portal, invoice management, payroll systems, and estimate management. Streamlined operations for service-based business.',
        description: 'Complete CRM solution with client portal, invoice management, payroll systems, and estimate management. Streamlined operations for service-based business.'
      }
    },
    { 
      name: 'CJS Golf Academy', 
      category: 'Sports & Recreation', 
      avatar: 'CG', 
      color: '#10B981',
      content: {
        title: 'Modern, responsive website showcasing golf instruction services with booking integration and student progress tracking systems.',
        description: 'Modern, responsive website showcasing golf instruction services with booking integration and student progress tracking systems.'
      }
    },
  ];

  const handleClientHover = (index: number) => {
    setActiveClient(index);
  };

  return (
    <section className="client-section">
      <div className="container">
        <h2>Trusted by Growing Businesses</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#64748B', fontSize: '1.2rem' }}>
          We&apos;ve helped companies across industries streamline their operations with custom software solutions
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
              <p style={{ color: 'white', opacity: 0.9, margin: '0.5rem 0 0 0' }}>{clients[activeClient].category}</p>
            </div>
          </div>
          <div className="showcase-content">
            <h3>{clients[activeClient].name}</h3>
            <p style={{ color: clients[activeClient].color, fontWeight: '600', marginBottom: '1rem' }}>{clients[activeClient].category}</p>
            <p>{clients[activeClient].content.description}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <button 
                className="btn btn-secondary"
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  fontSize: '0.9rem',
                  marginTop: '1rem'
                }}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 