/**
 * Utility function to open Calendly's native popup widget
 */
export function openCalendlyPopup(
  url: string = 'https://calendly.com/swiftwareco/30min'
): void {
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url:
        url +
        '?background_color=0a0a0a&text_color=f4f4f5&primary_color=3b82f6&hide_gdpr_banner=1&hide_event_type_details=0&hide_landing_page_details=1',
    });
  } else {
    // Fallback to opening in new tab if Calendly script hasn't loaded
    window.open(url, '_blank');
  }
}

/**
 * Initialize Calendly scripts if they haven't been loaded yet
 */
export function initCalendlyScripts(): void {
  if (typeof window === 'undefined') return;

  // Load Calendly widget script
  if (
    !document.querySelector(
      'script[src*="calendly.com/assets/external/widget.js"]'
    )
  ) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }

  // Load Calendly CSS
  if (
    !document.querySelector(
      'link[href*="calendly.com/assets/external/widget.css"]'
    )
  ) {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}
