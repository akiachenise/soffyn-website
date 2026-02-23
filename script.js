document
  .getElementById("waitlist-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const email = form.querySelector('input[type="email"]').value;
    const fname = form.querySelector('input[type="text"]').value;

    const url =
      form.action.replace("/post?", "/post-json?") +
      "&EMAIL=" +
      encodeURIComponent(email) +
      "&FNAME=" +
      encodeURIComponent(fname) +
      "&c=callback";

    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    window.callback = function (data) {
      document.body.removeChild(script);
      window.location.href = "/thank-you.html";
    };
  });
