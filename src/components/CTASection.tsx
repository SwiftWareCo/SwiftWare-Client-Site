'use client';

import { usePathname } from 'next/navigation';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { openCalendlyPopup } from '@/lib/calendly';
import { cn } from '@/lib/utils';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

type CTAButtonConfig = {
  label: string;
  variant?: 'primary' | 'secondary';
};

type CTATone = 'default' | 'secondary';

function CalendlyButton({
  label,
  variant = 'primary',
  tone,
}: CTAButtonConfig & { tone: CTATone }) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  const primaryBase = 'bg-transparent text-white border-transparent';
  const secondaryOnDefault = 'bg-transparent';
  const secondaryOnSecondary =
    'bg-transparent text-secondary-foreground border-secondary-foreground/40 hover:bg-secondary-foreground/10';

  const variantClass =
    variant === 'primary'
      ? primaryBase
      : tone === 'secondary'
        ? secondaryOnSecondary
        : secondaryOnDefault;

  const style =
    variant === 'primary'
      ? {
          boxShadow: `0 14px 40px rgba(${colorsRGB.primaryRGB}, 0.22)`,
        }
      : tone !== 'secondary'
        ? {
            color: colors.primary,
            borderColor: colors.primary,
          }
        : undefined;

  return (
    <InteractiveHoverButton
      type='button'
      text={label}
      onClick={() => openCalendlyPopup()}
      className={cn(
        'w-full sm:w-auto px-8 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5',
        variantClass
      )}
      style={style}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = `0 18px 44px rgba(${colorsRGB.primaryRGB}, 0.3)`;
        } else if (tone !== 'secondary') {
          e.currentTarget.style.backgroundColor = `${colors.primary}1a`;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = `0 14px 40px rgba(${colorsRGB.primaryRGB}, 0.22)`;
        } else if (tone !== 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    />
  );
}

function CTASection({
  heading,
  description,
  buttons,
  backgroundClassName = 'bg-background',
  tone = 'default',
}: {
  heading: string;
  description: string;
  buttons: CTAButtonConfig[];
  backgroundClassName?: string;
  tone?: CTATone;
}) {
  const headingClass =
    tone === 'secondary' ? 'text-secondary-foreground' : 'text-foreground';
  const paragraphClass =
    tone === 'secondary'
      ? 'text-secondary-foreground/80'
      : 'text-muted-foreground';

  return (
    <section className={cn(backgroundClassName, 'py-24')}>
      <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
        <h2 className={cn('text-3xl font-semibold sm:text-4xl', headingClass)}>
          {heading}
        </h2>
        <p className={cn('mt-4 text-lg', paragraphClass)}>{description}</p>
        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          {buttons.map((button) => (
            <CalendlyButton
              key={button.label}
              label={button.label}
              variant={button.variant}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
