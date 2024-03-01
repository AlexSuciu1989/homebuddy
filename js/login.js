let userData;

function randomMemberColor() {
  const colorsArray = [
    "#ac3e31",
    "#484848",
    "#488a99",
    "#6ab187",
    "#1f3f49",
    "#0091d5",
    "#dbae58",
    "#d32d41",
    "#1c4e80",
  ];

  for (let i = 1; i <= 4; i++) {
    let selectedColorIndex = Math.floor(Math.random() * colorsArray.length);
    let selectedColor = colorsArray[selectedColorIndex];
    document.querySelector(".member" + i).style.backgroundColor = selectedColor;

    colorsArray.splice(selectedColorIndex, 1);
  }
}

function submitLoginForm() {
  return new Promise((resolve, reject) => {
    document
      .getElementById("login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const loginMessageBox = document.querySelector(".login-message");
        fetch("https://homebuddy.ro/php/login.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
          })
          .then((dataRetrieved) => {
            userData = dataRetrieved;
            resolve(userData); // Resolve the promise with userData

            const memberSelectForm = document.querySelector(
              ".member-selection-popup"
            );
            memberSelectForm.style.display = "flex";
            loginMessageBox.textContent = "";
            randomMemberColor();
          })
          .catch((error) => {
            //console.error('Form submission error:', error);
            //reject(error); // Reject the promise with the error

            loginMessageBox.textContent =
              "Username or password are not correct!";
          });
      });
  });
}

function selectMember() {
  document.querySelector(".userName").textContent = userData.account;

  for (let i = 1; i <= 4; i++) {
    document.querySelector(".member" + i).textContent = userData["membru" + i];
  }
}

function enterLandingPage() {
  const doneButton = document.querySelector(".select-member");

  doneButton.addEventListener("click", function () {
    window.location.href = "alexsuciu1989.github.io/account.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  submitLoginForm().then(() => {
    // userData is now available

    selectMember();
    console.log(userData);
  });
  enterLandingPage();
});
