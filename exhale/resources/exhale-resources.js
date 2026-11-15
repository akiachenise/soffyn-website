"use strict";
// No forms or tracking. The browser handles saving to PDF through its print dialog.
(function () {
  var button = document.getElementById("exhale-print");
  if (button) {
    button.hidden = false;
    button.addEventListener("click", function () {
      window.print();
    });
  }
})();
