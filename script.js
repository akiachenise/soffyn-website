document
  .getElementById("waitlist-form")
  .addEventListener("submit", function (e) {
    const form = this;
    const email = form.querySelector('input[type="email"]').value;
    const fname = form.querySelector('input[type="text"]').value;
    const gdpr = form.querySelector('input[name="gdpr[57651]"]');

    console.log("Email:", email);
    console.log("First name:", fname);
    console.log("GDPR checkbox:", gdpr ? gdpr.checked : "not found");
    console.log("Form action:", form.action);
  });
