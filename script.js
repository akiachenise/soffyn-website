document
  .getElementById("waitlist-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      mode: "no-cors",
    }).then(function () {
      window.location.href = "/thank-you.html";
    });
  });
