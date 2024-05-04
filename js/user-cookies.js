import { logout } from "./cookies/cookies.js";

function setCookie(name, value, daysToExpire) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

function getCookie(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function setUsernameCookie(username, member, memberColors, memberNames) {
  setCookie("username", username, 365);
  setCookie("member", member, 365);
  setCookie("memberColors", memberColors, 365);
  setCookie("memberNames", memberNames, 365);
}

function getUsernameCookie() {
  return {
    username: getCookie("username"),
    member: getCookie("member"),
    memberColors: getCookie("memberColors"),
    memberNames: getCookie("memberNames"),
  };
}

function getUsernameLogin() {
  const loginButton = document.querySelector(".select-member");
  var storedUsername = getUsernameCookie();
  if (storedUsername.username && storedUsername.member) {
    console.log(
      "Bine ai revenit, " +
        storedUsername.username +
        ", " +
        storedUsername.member +
        "!"
    );
  }

  let memberNameText;
  if (window.location.pathname === "/") {
    const memberNames = document.querySelectorAll(".member");
    memberNames.forEach(function (memberName) {
      memberName.addEventListener("click", function (event) {
        memberNameText = event.target.textContent;

        memberNames.forEach(function (el) {
          el.classList.remove("member-border");
        });
        event.target.classList.add("member-border");
      });
    });

    loginButton.addEventListener("click", function () {
      const memberPopup = document.querySelector(".userName").textContent;
      const memberColors = document.querySelectorAll(".member");

      const memberColorsArray = Array.from(memberColors).map(
        (memberColor) => memberColor.style.backgroundColor
      );
      const memberNamesArray = Array.from(memberColors).map(
        (memberColor) => memberColor.textContent
      );

      console.log(memberColorsArray);
      console.log(memberPopup);
      if (memberPopup !== null) {
        var newUsername = document.querySelector(".userName").textContent;
        if (newUsername) {
          setUsernameCookie(
            newUsername,
            memberNameText,
            memberColorsArray,
            memberNamesArray
          );
        }
      } else {
        var newUsername = "Guest user";
      }
      console.log(
        "Userul tau este " + newUsername + " si membrul este " + memberNameText
      );
    });
  }
}

const isLogged = () => {
  if (getCookie("username")) {
    const myModal = new bootstrap.Modal("#myModal");

    myModal.show();

    document.querySelector(
      ".welcome-title"
    ).innerHTML = `Welcome back ${getCookie(
      "username"
    )}, you are logged as ${getCookie("member")} `;

    document.querySelector(".welcome-body").innerHTML = `It is not you?
 <button type="button" class="btn btn-sm btn-danger mx-1 py-0 px-1 text-white welcome-logout" data-bs-dismiss="modal">Logout</button>`;
  }

  logout(document.querySelector(".welcome-logout"));

  document.querySelector(".welcome-enter").addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/account.html";
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getUsernameLogin();
  isLogged();
});

export { setCookie };
