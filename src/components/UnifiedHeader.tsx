'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { RoundedSlideButton } from '@/components/ui/rounded-slide-button';
import { CustomDropdown } from '@/components/ui/custom-dropdown';
import { openCalendlyPopup } from '@/lib/calendly';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

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
  { label: 'Golf Management', href: '/custom-software/golf' },
  { label: 'Web Portals', href: '/custom-software/web-portals' },
];

const headerContainerVariants = {
  hidden: {
    y: -24, // slide header in from the top so it feels anchored to the viewport edge
    opacity: 0, // fade from transparent to avoid harsh popping on mount
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8, // quick entry that still leaves room for interior stagger
      ease: [0.16, 1, 0.3, 1] as const, // reuse our "swift" cubic-bezier for consistency
      when: 'beforeChildren', // animate shell first so nested elements follow naturally
    },
  },
};

const navCardVariants = {
  rest: {
    borderRadius: '1.5rem', // maintain large radius while the navbar is expanded
  },
  scrolled: {
    borderRadius: '1.25rem', // tighten the radius so the card feels more compact in motion
    transition: {
      duration: 0.35, // brisk response to scroll feedback
      ease: [0.25, 0.8, 0.25, 1] as const, // ease-in-out curve that keeps shrink smooth
    },
  },
};

const hoverHaloVariants = {
  rest: {
    opacity: 0, // hide the glow until the pointer enters
  },
  hover: {
    opacity: 1, // reveal the halo so the card feels interactive
    transition: {
      duration: 0.3, // quick fade for responsive feedback
      ease: 'easeOut' as const, // align with our signature easing even on hover
    },
  },
};

const dividerVariants = {
  hidden: {
    scaleX: 0, // collapse divider when the card mounts to avoid sudden appearance
  },
  visible: {
    scaleX: 1, // stretch to full width once the header is in place
    transition: {
      duration: 0.9, // slower draw to mimic a light sweep
      delay: 0.4, // wait for main elements so this feels like a finishing flourish
      ease: [0.33, 1, 0.68, 1] as const, // standard ease-out-bezier to glide into place
    },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0, // fade menu out before it scales away
    scaleY: 0.85, // shrink vertically so the panel feels like it compresses upward
    transition: {
      duration: 0.2, // quick exit to keep mobile snappy
      ease: [0.45, 0, 0.55, 1] as const, // ease-in-out curve for mirrored close
    },
  },
  visible: {
    opacity: 1, // make menu readable once expanded
    scaleY: 1, // return to full size when the menu is open
    transition: {
      duration: 0.3, // slightly slower open for readability
      ease: [0.33, 1, 0.68, 1] as const, // ease out so the panel gently settles
      staggerChildren: 0.05, // cascade menu items to guide the eye downward
    },
  },
};

const subMenuVariants = {
  hidden: {
    opacity: 0, // hide submenu content until the toggle is active
    clipPath: 'inset(0% 0% 100% 0%)', // mask the content vertically so it slides from beneath the parent
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)', // reveal the full submenu surface when expanded
    transition: {
      duration: 0.25, // brisk expand so it feels responsive on tap
      ease: [0.33, 1, 0.68, 1] as const, // ease out to match parent motion
    },
  },
};

const chevronVariants = {
  closed: {
    rotate: 0, // point chevron downward when the submenu is closed
  },
  open: {
    rotate: 180, // flip chevron upward to indicate the expanded state
    transition: {
      duration: 0.2, // quick half-turn to match mobile expectations
      ease: [0.33, 1, 0.68, 1] as const, // soft ease so rotation feels organic
    },
  },
};

export default function UnifiedHeader() {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCustomSoftwareOpen, setMobileCustomSoftwareOpen] =
    useState(false);
  const [triggerButtonAnimation, setTriggerButtonAnimation] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 160], [1, 0.95]);
  const navPadding = useTransform(scrollY, [0, 160], [20, 12]);
  const undockOffset = useTransform(scrollY, [0, 160], [0, 24]);
  const floatingTop = useSpring(undockOffset, {
    stiffness: 220,
    damping: 30,
    mass: 0.7,
  });

  // Generate box shadow dynamically based on colors
  const headerShadowScrolled = scrolled
    ? `0 16px 40px rgba(${colorsRGB.primaryRGB}, 0.15), 0 0 0 1px rgba(${colorsRGB.secondaryRGB}, 0.1)`
    : 'none';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trigger button animation every 5 seconds
  useEffect(() => {
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const startTimer = setTimeout(() => {
      setTriggerButtonAnimation(true);
      resetTimer = setTimeout(() => setTriggerButtonAnimation(false), 900);
    }, 900);

    return () => {
      clearTimeout(startTimer);
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.header
      className='fixed left-0 right-0 z-50'
      onMouseMove={handleMouseMove}
      variants={headerContainerVariants}
      initial='hidden'
      animate='visible'
      style={{ top: floatingTop }}
    >
      <div className='relative w-full px-4 sm:px-6 lg:px-10'>
        <div
          className='pointer-events-none absolute inset-x-0 -top-32 h-64 opacity-60'
          style={{
            background: `radial-gradient(80% 50% at 50% 0%,
              rgba(${colorsRGB.primaryRGB}, 0.15),
              rgba(${colorsRGB.secondaryRGB}, 0.1),
              transparent 70%)`,
          }}
        />

        <motion.div className='relative w-full'>
          <motion.div className='relative w-full group'>
            <motion.div
              className='relative w-full overflow-visible rounded-3xl border border-transparent backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-500'
              variants={navCardVariants}
              initial='rest'
              animate={scrolled ? 'scrolled' : 'rest'}
              style={{
                borderColor: scrolled
                  ? `rgba(${colorsRGB.primaryRGB}, 0.28)`
                  : 'rgba(255,255,255,0)',
                boxShadow: headerShadowScrolled,
                backgroundColor: scrolled ? 'var(--background)' : 'transparent',
                background: scrolled
                  ? 'color-mix(in srgb, var(--background) 96%, transparent)'
                  : 'transparent',
                scale: navScale,
                paddingTop: navPadding,
                paddingBottom: navPadding,
              }}
              onHoverStart={() => setNavHovered(true)}
              onHoverEnd={() => setNavHovered(false)}
            >
              <motion.div
                className='absolute inset-0 rounded-[inherit] opacity-0 pointer-events-none'
                style={{
                  background: `radial-gradient(340px circle at ${mousePos.x}% ${mousePos.y}%, rgba(${colorsRGB.primaryRGB},0.05), transparent 55%)`,
                }}
                variants={hoverHaloVariants}
                initial='rest'
                animate={navHovered ? 'hover' : 'rest'}
              />

              <div className='relative mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6'>
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
                          backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
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
                      <span
                        className='bg-clip-text text-transparent text-sm'
                        style={{
                          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                      >
                        Swiftware
                      </span>
                      <div
                        className='text-[10px]'
                        style={{ color: colors.primary }}
                      >
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='cursor-pointer rounded-lg p-2 text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground'
                  >
                    <AnimatePresence mode='wait' initial={false}>
                      {mobileMenuOpen ? (
                        <motion.span
                          key='close-icon'
                          initial={{ opacity: 0, rotate: -45 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 45 }}
                          transition={{ duration: 0.2 }}
                          className='inline-flex'
                        >
                          <X className='size-5' />
                        </motion.span>
                      ) : (
                        <motion.span
                          key='menu-icon'
                          initial={{ opacity: 0, rotate: 45 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: -45 }}
                          transition={{ duration: 0.2 }}
                          className='inline-flex'
                        >
                          <Menu className='size-5' />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {mobileMenuOpen && (
                    <motion.div
                      key='mobile-menu'
                      variants={mobileMenuVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      className='mt-4 flex flex-col gap-2 border-t border-border pt-4'
                      style={{ transformOrigin: 'top center' }}
                    >
                      {/* Services Dropdown */}
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className='group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground'
                      >
                        <span>Services</span>
                        <motion.div
                          variants={chevronVariants}
                          initial={mobileServicesOpen ? 'open' : 'closed'}
                          animate={mobileServicesOpen ? 'open' : 'closed'}
                        >
                          <ChevronDown className='size-4' />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.div
                            key='mobile-services'
                            variants={subMenuVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            className='flex flex-col gap-2 overflow-hidden pl-4'
                          >
                            {serviceLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className='cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground'
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
                      </AnimatePresence>

                      {/* Custom Software Dropdown */}
                      <button
                        onClick={() =>
                          setMobileCustomSoftwareOpen(!mobileCustomSoftwareOpen)
                        }
                        className='group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground'
                      >
                        <span>Custom Software</span>
                        <motion.div
                          variants={chevronVariants}
                          initial={mobileCustomSoftwareOpen ? 'open' : 'closed'}
                          animate={mobileCustomSoftwareOpen ? 'open' : 'closed'}
                        >
                          <ChevronDown className='size-4' />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileCustomSoftwareOpen && (
                          <motion.div
                            key='mobile-custom-software'
                            variants={subMenuVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            className='flex flex-col gap-2 overflow-hidden pl-4'
                          >
                            {customSoftwareLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className='cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground'
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
                      </AnimatePresence>

                      {/* Mobile CTA Button */}
                      <div className='mt-2 w-full'>
                        <RoundedSlideButton
                          onClick={() => {
                            openCalendlyPopup();
                            setMobileMenuOpen(false);
                          }}
                          autoAnimate={triggerButtonAnimation}
                          className='w-full sm:w-auto'
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                          backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
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
                      <span
                        className='bg-clip-text text-transparent text-base'
                        style={{
                          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                      >
                        Swiftware
                      </span>
                      <div
                        className='text-xs'
                        style={{ color: colors.primary }}
                      >
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  {/* Navigation Links */}
                  <nav className='hidden lg:flex items-center gap-8 overflow-visible'>
                    {/* Services Dropdown */}
                    <CustomDropdown trigger='Services' items={serviceLinks} />

                    {/* Custom Software Dropdown */}
                    <CustomDropdown
                      trigger='Custom Software'
                      items={customSoftwareLinks}
                    />
                  </nav>

                  {/* Theme Toggle & CTA Button */}
                  <div className='flex items-center gap-4'>
                    {/* <ModeToggle /> */}
                    <RoundedSlideButton
                      onClick={() => openCalendlyPopup()}
                      autoAnimate={triggerButtonAnimation}
                      className='w-full sm:w-auto'
                    />
                  </div>
                </div>
              </div>

              <motion.div
                variants={dividerVariants}
                initial='hidden'
                animate='visible'
                className='absolute bottom-0 inset-x-4 sm:inset-x-6 h-[1px]'
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                  opacity: scrolled ? 0.6 : 0.4,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
