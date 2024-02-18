function getEvents() {
  const loggedUser = getCookie("username");
  fetch(
    "https://homebuddy.ro/php/agenda-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser)
  )
    .then((response) => response.json())
    .then((dataRetrieved) => {
      // console.log(dataRetrieved);

      dataRetrieved.forEach((data) => {
        // console.log(data.eventdate);
        let dateObject = new Date(data.eventdate);
        let year = dateObject.getFullYear();
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Ensure two-digit month
        let day = ("0" + dateObject.getDate()).slice(-2); // Ensure two-digit day
        let formattedDate = year + "-" + month + "-" + day;
        const container = document.querySelector("#event-" + formattedDate);
        if (container) {
          const eventNew = document.createElement("div");
          eventNew.className =
            "card ms-5 m-1 p-1 bg-primary bg-opacity-25 text-white event";
          eventNew.innerHTML =
            "<div class='card-text' role='button'>" +
            data.addedevent +
            "</div>";

          //   console.log(formattedDate)

          container.appendChild(eventNew);
        }
      });
      targetEvent();
    })
    .catch((error) => {
      console.error("Error fetching events", error);
    });
}

function targetEvent() {
  const events = document.querySelectorAll(".event");
  if (events.length === 0) {
    console.error("No elements with class 'event' found.");
    return;
  }
  events.forEach(function (item) {
    item.addEventListener("click", function (event) {
      const clickedItem = event.target;
      events.forEach(function (eventItem) {
        eventItem.classList.remove("bg-secondary");
      });
      if (clickedItem === item) {
        // Check if the clicked element is the parent itself
        clickedItem.classList.add("bg-secondary");
      } else {
        clickedItem.parentElement.classList.add("bg-secondary");
      }
    });
  });
}

function addDate() {
  const today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2); // Ensure two-digit month
  let day = ("0" + today.getDate()).slice(-2); // Ensure two-digit day
  document.querySelector(".today").innerHTML =
    "<div class='card-title'><span class='badge bg-danger'>Today</span>" +
    " " +
    "<span>" +
    today.toDateString() +
    "</span></div>";
  document.querySelector(".today").id =
    "event-" + year + "-" + month + "-" + day;

  let calculatedDate = new Date();
  let calculatedDateTwo = new Date();
  const numIterations = 27;
  const numIterationsTwo = 3;
  const iterationArray = Array.from({ length: numIterations });
  const iterationArrayTwo = Array.from({ length: numIterationsTwo });
  let i = 28;
  let r = 28;
  iterationArray.forEach(() => {
    calculatedDate.setDate(calculatedDate.getDate() + 1);
    i = i - 1;
    let formatedDated =
      "event-" +
      calculatedDate.getFullYear() +
      "-" +
      ("0" + (calculatedDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + calculatedDate.getDate()).slice(-2);
    document.querySelector(".column" + i).innerHTML =
      "<div class='card-title'>" + calculatedDate.toDateString() + "</div>";
    document.querySelector(".column" + i).id = formatedDated;
  });

  iterationArrayTwo.forEach(() => {
    calculatedDateTwo.setDate(calculatedDateTwo.getDate() - 1);
    let formatedDated =
      "event-" +
      calculatedDateTwo.getFullYear() +
      "-" +
      ("0" + (calculatedDateTwo.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + calculatedDateTwo.getDate()).slice(-2);

    r = r + 1;
    document.querySelector(".column" + r).innerHTML =
      calculatedDateTwo.toDateString();
    document.querySelector(".column" + r).id = formatedDated;
  });
}

function logout() {
  const logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", function () {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "member=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "memberColors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //console.log('buton apasat')
    window.location.href = "https://homebuddy.ro/";
  });
}

//Done
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

function getUserColorsArray() {
  const memberColorString = getCookie("memberColors");
  const decodedMemberColorString = decodeURIComponent(
    memberColorString
  ).replace(/%2C%20/g, "_COMMA_");
  const rgbValues = decodedMemberColorString.match(/\d+,\s*\d+,\s*\d+/g);
  const memberColorArray = rgbValues.map((value) => "rgb(" + value + ")");
  const memberNamesArray = decodeURIComponent(getCookie("memberNames")).split(
    ","
  );
  const memberInfo = Object.fromEntries(
    memberNamesArray.map((name, index) => [name, memberColorArray[index]])
  );

  return memberInfo;
}

//Done
function getUserGreeting() {
  const userName = getCookie("username");
  const memberName = getCookie("member");
  const memberInfo = getUserColorsArray();
  document.querySelector(".header-user").textContent = userName;
  document.querySelector(".header-member").textContent = memberName;
  document.querySelector(".logout").style.backgroundColor =
    memberInfo[memberName];
  const r = document.querySelector(":root");
  r.style.setProperty("--theme", memberInfo[memberName]);
}

function bootstrapModal() {
  const myModal = document.querySelector(".modal");
  const myInput = document.querySelector(".add-event");

  myModal.addEventListener("shown.bs.modal", () => {
    myInput.focus();
  });
}

function saveEventData() {
  const saveBtn = document.querySelector(".save-event");

  const eventDataObj = {
    eventdate: "",
    addedevent: "",
    user: "",
  };

  saveBtn.addEventListener("click", async function () {
    eventDataObj.eventdate = document.querySelector(".new-date").value;
    eventDataObj.addedevent = document.querySelector(".new-event-body").value;
    eventDataObj.user = getCookie("username");

    console.log("my Object to save: ", eventDataObj);

    try {
      const response = await fetch(
        "https://homebuddy.ro/php/agenda-to-sql.php",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(eventDataObj),
        }
      );

      if (response.ok) {
        console.log(await response.text());
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getUserColorsArray();
  getUserGreeting();

  saveEventData();
  bootstrapModal();
  addDate();
  getEvents();
  // targetEvent();
  logout();
});
