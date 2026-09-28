// Enhance only the contact form; keep native submission as a no-JavaScript fallback.
(() => {
  const form = document.querySelector('form[name="contact"]');
  const status = document.getElementById('contact-status');
  if (!form || !status) return;
  const button = form.querySelector('button[type="submit"]');
  const fields = [...form.querySelectorAll('input:not([type="hidden"]), textarea')];
  const originalReadOnly = fields.map(field => field.readOnly);
  let sending = false;
  let submitted = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || submitted || !form.reportValidity()) return;
    const body = new URLSearchParams(new FormData(form));
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    fields.forEach(field => { field.readOnly = true; });
    status.textContent = 'Sending your message…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('Submission was not accepted');
      submitted = true;
      button.textContent = 'Message sent';
      status.textContent = 'Your message has been sent.';
    } catch {
      button.disabled = false;
      button.textContent = 'Send message';
      fields.forEach((field, index) => { field.readOnly = originalReadOnly[index]; });
      status.textContent = 'Your message could not be confirmed as sent. Your text is still here. Please try again, or email hello@soffyn.com.';
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
