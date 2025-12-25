/**
 * Google Analytics 4 (GA4) Component
 * Measurement ID: G-XZLZZ6LGYL
 * 
 * Documentation: https://developers.google.com/analytics/devguides/collection/gtagjs
 */

export function GoogleAnalyticsScript() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XZLZZ6LGYL"
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-XZLZZ6LGYL');
          `,
        }}
      />
    </>
  );
}

/**
 * Helper function to track custom events
 * Usage example:
 * 
 * import { trackEvent } from '@/components/GoogleAnalytics';
 * 
 * trackEvent('play_sound', {
 *   sound_name: 'Pluie Douce',
 *   sound_id: 'rain',
 * });
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

/**
 * Helper function to track page views
 * Usage: trackPageView('/sounds')
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-XZLZZ6LGYL', {
      page_path: url,
    });
  }
}

