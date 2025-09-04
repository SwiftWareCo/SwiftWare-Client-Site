import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 border-t border-purple-500/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/images/swiftware-logo.png" 
              alt="SwiftWare" 
              width={70}
              height={70}
              className="brightness-110 contrast-110 bg-white/10 p-3 rounded-lg mb-2"
            />
            <h3 className="text-purple-400 text-xl font-semibold mb-2">SwiftWare</h3>
            <p className="text-gray-400 text-sm">Transforming business operations with intelligent software solutions</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/services" className="text-gray-400 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
              Services
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          © 2024 SwiftWare. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 