(function () {
  // Set this to your production backend URL if the frontend is hosted on a different domain
  const PROD_BACKEND_URL = 'https://her-birthday-site-backend.vercel.app';

  const BACKEND_URL =
    window.location.protocol === 'file:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : (PROD_BACKEND_URL || '');

  // 1. Session ID Management: Always generate a new session ID on load/refresh
  const visitId = 'visit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
  sessionStorage.setItem('visitId', visitId);

  // 2. System and Browser Detection
  function getSystemInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';
    let device = 'Desktop';

    // Browser Detection
    if (ua.indexOf('Firefox') > -1) browser = 'Mozilla Firefox';
    else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browser = 'Opera';
    else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) browser = 'Microsoft Edge';
    else if (ua.indexOf('Chrome') > -1) browser = 'Google Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';

    // OS Detection
    if (ua.indexOf('Windows NT 10.0') > -1) os = 'Windows 10/11';
    else if (ua.indexOf('Windows NT 6.2') > -1) os = 'Windows 8';
    else if (ua.indexOf('Macintosh') > -1) os = 'macOS';
    else if (ua.indexOf('iPhone') > -1) os = 'iOS (iPhone)';
    else if (ua.indexOf('iPad') > -1) os = 'iOS (iPad)';
    else if (ua.indexOf('Android') > -1) os = 'Android';
    else if (ua.indexOf('Linux') > -1) os = 'Linux';

    // Device Detection
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
      device = /iPad|Tablet/i.test(ua) ? 'Tablet' : 'Mobile';
    }

    return {
      browser,
      operatingSystem: os,
      device,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || navigator.userLanguage || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      userAgent: ua,
    };
  }

  // 3. Log Visit Start
  const sysInfo = getSystemInfo();
  const firstVisit = !localStorage.getItem('firstVisitChecked');
  if (firstVisit) {
    localStorage.setItem('firstVisitChecked', 'true');
  }

  const startPayload = {
    visitId,
    firstVisit,
    ...sysInfo,
  };

  fetch(BACKEND_URL + '/api/visit/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(startPayload),
  }).catch((e) => console.log('Analytics start failed:', e));

  // 4. Global Event Tracking Helper
  window.trackEvent = function (eventObj) {
    if (!eventObj || !eventObj.event || !eventObj.section) return;

    const payload = {
      visitId,
      event: eventObj.event,
      section: eventObj.section,
      data: eventObj.data || {},
    };

    // If it's a completion event, track it globally
    if (eventObj.event === 'final_question_answered') {
      window.visitCompleted = true;
    }

    fetch(BACKEND_URL + '/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((e) => console.log('Analytics event log failed:', e));
  };

  // 5. Track Text Copies Silently
  document.addEventListener('copy', () => {
    try {
      const selectedText = window.getSelection() ? window.getSelection().toString() : '';
      if (selectedText.trim() && window.trackEvent) {
        window.trackEvent({
          event: 'text_copied',
          section: 'interaction',
          data: {
            text: selectedText.substring(0, 150)
          }
        });
      }
    } catch (e) {
      console.error('Error tracking copy event:', e);
    }
  });

  // 6. Track Session Closure (visibilitychange best practice)
  const sessionStartTime = Date.now();
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const duration = Math.round((Date.now() - sessionStartTime) / 1000);
      const endPayload = JSON.stringify({
        visitId,
        endedAt: new Date().toISOString(),
        duration,
        completed: !!window.visitCompleted,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          BACKEND_URL + '/api/visit/end',
          new Blob([endPayload], { type: 'application/json' })
        );
      } else {
        fetch(BACKEND_URL + '/api/visit/end', {
          method: 'POST',
          body: endPayload,
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        });
      }
    }
  });
})();
