document
  .getElementById("waitlist-form")
  .addEventListener("submit", function () {
    setTimeout(function () {
      window.location.href = "/thank-you.html";
    }, 1500);
  });
