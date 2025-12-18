interface CalendlyWidget {
  initPopupWidget(options: { url: string }): void;
}

declare global {
  interface Window {
    Calendly?: CalendlyWidget;
  }
}

/**
 * Utility function to open Calendly's native popup widget
 */
export function openCalendlyPopup(
  url: string = 'https://calendly.com/swiftwareco/30min'
): void {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({
      url:
        url +
        '?background_color=0a0a0a&text_color=f4f4f5&primary_color=3b82f6&hide_gdpr_banner=1&hide_event_type_details=0&hide_landing_page_details=1',
    });
  } else {
    // Fallback to opening in new tab if Calendly script hasn't loaded
    window.open(url, '_blank');
  }
}
