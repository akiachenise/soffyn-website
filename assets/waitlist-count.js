import { WAITLIST_COUNT, SHOW_WAITLIST_COUNT } from "./constants.js";

if (SHOW_WAITLIST_COUNT) {
  document.querySelectorAll("[data-waitlist-count]").forEach((el) => {
    el.textContent = `${WAITLIST_COUNT}+ women already inside.`;
    el.hidden = false;
  });
}
