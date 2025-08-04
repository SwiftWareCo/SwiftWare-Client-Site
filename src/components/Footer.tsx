import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img 
              src="/images/swiftware-logo.png" 
              alt="SwiftWare" 
              className="footer-logo"
              style={{ 
                height: '70px', 
                width: 'auto',
                filter: 'brightness(1.2) contrast(1.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            />
            <h3 style={{ color: '#6366F1', marginBottom: '0.5rem', fontSize: '1.2rem' }}>SwiftWare</h3>
            <p>Transforming business operations with intelligent software solutions</p>
          </div>
          
          <div className="footer-nav">
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          © 2024 SwiftWare. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 