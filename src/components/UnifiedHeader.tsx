'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { RoundedSlideButton } from '@/components/ui/rounded-slide-button';
import { CustomDropdown } from '@/components/ui/custom-dropdown';
import { openCalendlyPopup } from '@/lib/calendly';

interface NavLink {
  label: string;
  href: string;
}

const serviceLinks: NavLink[] = [
  { label: 'Brand Design', href: '/brand-design' },
  { label: 'Digital Marketing & SEO', href: '/digital-marketing-seo' },
  { label: 'AI & Automation', href: '/ai-automation' },
];

const customSoftwareLinks: NavLink[] = [
  { label: 'CRM', href: '/custom-software/crm' },
  { label: 'AI & Automation (AI/RAG)', href: '/custom-software/ai-rag' },
  { label: 'Golf Management', href: '/custom-software/golf' },
  { label: 'Web Portals', href: '/custom-software/web-portals' },
];

const allNavLinks: NavLink[] = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
];

export default function UnifiedHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCustomSoftwareOpen, setMobileCustomSoftwareOpen] = useState(false);
  const [triggerButtonAnimation, setTriggerButtonAnimation] = useState(false);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -5]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trigger button animation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTriggerButtonAnimation(true);
      setTimeout(() => setTriggerButtonAnimation(false), 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50'
      onMouseMove={handleMouseMove}
    >
      <div className='relative'>
        <div
          className='pointer-events-none absolute inset-x-0 -top-28 h-60 opacity-60'
          style={{
            background: `radial-gradient(80% 50% at 50% 0%,
              rgba(var(--color-primary-service-rgb), 0.15),
              rgba(var(--color-secondary-service-rgb), 0.1),
              transparent 70%)`,
          }}
        />

        <motion.div
          style={{ y: headerY }}
          className='relative mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4'
        >
          <motion.div
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
            className='relative group'
          >
            <motion.div
              animate={{
                scale: scrolled ? 0.985 : 1,
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
              className='rounded-2xl backdrop-blur-xl overflow-visible
                         bg-background'
              style={{
                border: `1px solid var(--header-border)`,
                boxShadow: scrolled ? `var(--header-shadow-scrolled)` : `var(--header-shadow-default)`,
              }}
            >
              <motion.div
                className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none'
                style={{
                  background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%,
                    rgba(var(--color-primary-service-rgb),0.03), transparent 50%)`,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className='relative px-4 sm:px-6 py-2.5 sm:py-3'>
                {/* Mobile: Logo + Menu Button */}
                <div className='flex items-center justify-between sm:hidden'>
                  <Link
                    href='/'
                    className='group/logo relative flex items-center gap-2 text-base font-bold tracking-wide'
                  >
                    <div className='relative'>
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className='size-7 rounded-lg shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300 flex items-center justify-center p-1'
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--color-primary-service), var(--color-secondary-service))`,
                        }}
                      >
                        <Image
                          src='/images/swiftware-logo.png'
                          alt='Swiftware software development company logo'
                          width={20}
                          height={20}
                          className='mix-blend-screen'
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </motion.div>
                    </div>
                    <div className='leading-tight'>
                      <span className='bg-clip-text text-transparent text-sm' style={{
                        backgroundImage: `linear-gradient(to right, var(--color-primary-service), var(--color-secondary-service))`
                      }}>
                        Swiftware
                      </span>
                      <div className='text-[10px]' style={{ color: 'var(--color-primary-service)' }}>
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  <div className='flex items-center gap-3'>
                    <ModeToggle />
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className='cursor-pointer p-2 text-foreground/80 hover:text-foreground transition-colors'
                    >
                      {mobileMenuOpen ? (
                        <X className='size-5' />
                      ) : (
                        <Menu className='size-5' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='mt-4 flex flex-col gap-2 border-t border-border pt-4'
                  >
                    {/* Services Dropdown */}
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className='cursor-pointer w-full px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors flex items-center justify-between group'
                    >
                      <span>Services</span>
                      <motion.div
                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className='size-4' />
                      </motion.div>
                    </button>

                    {/* Services Submenu */}
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='flex flex-col gap-2 pl-4'
                      >
                        {serviceLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className='cursor-pointer px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors'
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* Custom Software Dropdown */}
                    <button
                      onClick={() => setMobileCustomSoftwareOpen(!mobileCustomSoftwareOpen)}
                      className='cursor-pointer w-full px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors flex items-center justify-between group'
                    >
                      <span>Custom Software</span>
                      <motion.div
                        animate={{ rotate: mobileCustomSoftwareOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className='size-4' />
                      </motion.div>
                    </button>

                    {/* Custom Software Submenu */}
                    {mobileCustomSoftwareOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='flex flex-col gap-2 pl-4'
                      >
                        {customSoftwareLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className='cursor-pointer px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors'
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileCustomSoftwareOpen(false);
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* Other Nav Links */}
                    {allNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className='cursor-pointer px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Mobile CTA Button */}
                    <div className='mt-2 w-full'>
                      <RoundedSlideButton
                        onClick={() => {
                          openCalendlyPopup();
                          setMobileMenuOpen(false);
                        }}
                        autoAnimate={triggerButtonAnimation}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Desktop: Full navigation */}
                <div className='hidden sm:flex sm:items-center sm:justify-between'>
                  <Link
                    href='/'
                    className='group/logo relative flex items-center gap-3 text-lg font-bold tracking-wide'
                  >
                    <div className='relative'>
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className='size-8 rounded-lg shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300 flex items-center justify-center p-1'
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--color-primary-service), var(--color-secondary-service))`,
                        }}
                      >
                        <Image
                          src='/images/swiftware-logo.png'
                          alt='Swiftware software development company logo'
                          width={22}
                          height={22}
                          className='mix-blend-screen'
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </motion.div>
                    </div>

                    <div className='leading-tight'>
                      <span className='bg-clip-text text-transparent text-base' style={{
                        backgroundImage: `linear-gradient(to right, var(--color-primary-service), var(--color-secondary-service))`
                      }}>
                        Swiftware
                      </span>
                      <div className='text-xs' style={{ color: 'var(--color-primary-service)' }}>
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  {/* Navigation Links */}
                  <nav className='hidden lg:flex items-center gap-8 overflow-visible'>
                    {/* Services Dropdown */}
                    <CustomDropdown trigger='Services' items={serviceLinks} />

                    {/* Custom Software Dropdown */}
                    <CustomDropdown trigger='Custom Software' items={customSoftwareLinks} />

                    {/* Other Nav Links */}
                    {allNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className='cursor-pointer text-sm text-foreground/80 hover:text-foreground transition-colors group'
                      >
                        <motion.span
                          className='inline-block'
                          variants={{
                            rest: { y: 0 },
                            hover: { y: -2 },
                          }}
                          initial='rest'
                          whileHover='hover'
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    ))}
                  </nav>

                  {/* Theme Toggle & CTA Button */}
                  <div className='flex items-center gap-4'>
                    <ModeToggle />
                    <RoundedSlideButton
                      onClick={() => openCalendlyPopup()}
                      autoAnimate={triggerButtonAnimation}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                className='absolute bottom-0 inset-x-4 sm:inset-x-6 h-[1px]'
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, var(--color-secondary-service), transparent)`,
                  opacity: scrolled ? 0.6 : 0.4,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
