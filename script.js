/* ── soffyn countdown timer ─────────────────────────────────
   Target: September 1, 2026
──────────────────────────────────────────────────────────── */

(function () {
  const LAUNCH_DATE = new Date("2026-09-01T00:00:00");

  document.addEventListener("DOMContentLoaded", function () {
    const els = {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      minutes: document.getElementById("cd-minutes"),
      seconds: document.getElementById("cd-seconds"),
    };

    // Only run if the countdown elements exist on this page
    if (!els.days) return;

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tick() {
      const now = new Date();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        // Launch day — swap the bar to a launch message
        const bar = document.getElementById("countdown");
        if (bar) {
          bar.closest(".founding-bar").innerHTML =
            '<p class="founding-note">soffyn is live. <a href="#hero" style="color:var(--teal);text-decoration:underline;">Get early access →</a></p>';
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      els.days.textContent = days;
      els.hours.textContent = pad(hours);
      els.minutes.textContent = pad(minutes);
      els.seconds.textContent = pad(seconds);
    }

    tick();
    setInterval(tick, 1000);
  });
})();
