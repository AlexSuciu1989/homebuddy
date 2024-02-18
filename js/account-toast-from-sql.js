function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  let foundCookieValue = null;

  cookieArray.forEach((cookie) => {
    let trimmedCookie = cookie.trim();
    if (trimmedCookie.indexOf(name) === 0) {
      foundCookieValue = trimmedCookie.substring(name.length);
    }
  });

  return foundCookieValue;
}

document.addEventListener("DOMContentLoaded", function () {
  const loggedUser = getCookie("username");

  fetch(
    "https://homebuddy.ro/php/toast-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser)
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      //console.log(data.length-1);

      data.forEach((item) => {
        let toastElement = document.createElement("div");
        toastElement.classList.add("toast-element");

        let toastElementHeader = document.createElement("div");
        toastElementHeader.classList.add("toast-element-header");
        toastElementHeader.textContent =
          item.member + " at " + item.nowdatetime;

        let toastElementBody = document.createElement("div");
        toastElementBody.classList.add("toast-element-body");
        toastElementBody.textContent = item.toast;

        let toastContainer = document.querySelector(".toast-board");

        toastContainer.appendChild(toastElement);
        toastElement.append(toastElementHeader, toastElementBody);
      });
    });
});
