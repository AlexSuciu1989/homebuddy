function addMemberNameToToast() {
  document.querySelector(".toast-user").textContent = getCookie("member");
}

async function sendToast() {
  const userName = getCookie("username");
  const familyMember = getCookie("member");
  const dateTime = document.querySelector(".toast-time").textContent;
  const toastContent = document.querySelector(".toast-content").textContent;

  const toast = {
    user: userName,
    member: familyMember,
    date: dateTime,
    content: toastContent,
  };
  console.log(toast);
  try {
    const response = await fetch("https://homebuddy.ro/php/toast-to-sql.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toast),
    });

    if (response.ok) {
      console.log(await response.text());
    } else {
      console.error("Failed to submit data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayRepeatingEvent() {
  const recurenta = document.querySelector(".new-recurenta");
  const hiddenRecurenta = document.querySelector(".new-repeating-event");
  recurenta.addEventListener("click", () => {
    if (recurenta.checked && hiddenRecurenta.classList.contains("hidden")) {
      document.querySelector(".new-repeating-event").classList.remove("hidden");
    } else {
      document.querySelector(".new-repeating-event").classList.add("hidden");
    }
  });
}

function addRemoveTags() {
  const tags = document.querySelectorAll(".new-badge-item");

  //add tags
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const tagText = e.target.textContent;
      const tagClass = e.target.className;

      const addedTag = document.createElement("span");
      addedTag.classList = tagClass;
      addedTag.innerHTML =
        tagText + "<button class='btn-close tag-close-btn'></button>";

      document.querySelector(".new-event-tag").appendChild(addedTag);

      //remove tags
      const closeButtons = document.querySelectorAll(".tag-close-btn");
      closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", (event) => {
          if (event.target.classList.contains("tag-close-btn")) {
            event.target.parentElement.remove();
            // console.log(event.target.parentElement.className);
          }
        });
      });
    });
  });
}

function addRemoveResponsible() {
  const responsibles = document.querySelectorAll(".new-badge-responsible");

  responsibles.forEach((responsible) => {
    responsible.addEventListener("click", (e) => {
      const responsibleName = e.target.textContent;
      const responsibleClass = e.target.className;

      const addedResponsible = document.createElement("span");
      addedResponsible.classList = responsibleClass;
      addedResponsible.innerHTML =
        responsibleName + "<button class='btn-close tag-close-btn'></button>";

      document
        .querySelector(".new-event-responsible")
        .appendChild(addedResponsible);

      const closeButtons = document.querySelectorAll(".tag-close-btn");
      closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", (event) => {
          if (event.target.classList.contains("tag-close-btn")) {
            event.target.parentElement.remove();
          }
        });
      });
    });
  });
}

function markElement() {
  const events = document.querySelectorAll(".mark-event");

  events.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const clickedItem = e.target;
      const clickedItemID = e.target.parentElement.id;

      const itemObject = {
        itemID: clickedItemID,
        itemStatus: String(clickedItem.checked),
      };

      console.log(itemObject);

      try {
        const response = await fetch(
          "https://homebuddy.ro/php/agenda-update-to-sql.php",
          {
            method: "UPDATE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(itemObject),
          }
        );
        if (response.ok) {
          console.log(await response.text());
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
}

function deleteEvent() {
  const events = document.querySelectorAll(".close-event");

  events.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const clickedItemID = e.target.parentElement.id;

      console.log("the id is " + clickedItemID);

      try {
        const response = await fetch(
          "https://homebuddy.ro/php/agenda-delete-from-sql.php",
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(clickedItemID),
          }
        );
        if (response.ok) {
          console.log(await response.text());
          e.target.parentElement.parentElement.remove();

          const dateAndTime = new Date();
          var formattedDateTime = dateAndTime.toLocaleString();
          document.querySelector(".toast-time").textContent = formattedDateTime;
          const toastText = document.querySelector(".toast-content");
          toastText.textContent =
            "Deleted one event (" +
            e.target.parentElement.textContent +
            ") from the Agenda";
          sendToast();
          document.querySelector(".my-toast").classList.remove("hidden");
          setTimeout(function () {
            document.querySelector(".my-toast").classList.add("hidden");
          }, 5000);
        } else {
          console.error("Failed to submit data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
}

function getEvents() {
  const loggedUser = getCookie("username");
  fetch(
    "https://homebuddy.ro/php/agenda-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser)
  )
    .then((response) => response.json())
    .then((dataRetrieved) => {
      console.log(dataRetrieved);

      dataRetrieved.forEach((data) => {
        // console.log(data.eventdate);
        let dateObject = new Date(data.eventdate);
        // let formattedDate = year + "-" + month + "-" + day;
        let recurenta = data.recurenta;
        let ArrayRecurenta;
        if (recurenta === "" || recurenta === "0" || recurenta === 0) {
          recurenta = 0;
        }
        recurenta = parseInt(recurenta);
        console.log(recurenta);
        if (recurenta !== 0) {
          ArrayRecurenta = Array.from(
            { length: 30 },
            (_, index) => index * recurenta
          );
        } else {
          ArrayRecurenta = [0];
        }
        console.log(ArrayRecurenta);
        ArrayRecurenta.forEach((recurentItem) => {
          let year = dateObject.getFullYear();
          let month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Ensure two-digit month
          let day = ("0" + dateObject.getDate()).slice(-2); // Ensure two-digit day

          if (data.unitate === "days") {
            // day = ("0" + (dateObject.getDate() + recurentItem)).slice(-2); // Ensure two-digit day
            dateObject.setDate(dateObject.getDate() + recurenta);
          } else if (data.unitate === "weeks") {
            dateObject.setDate(dateObject.getDate() + (recurenta + 6));
          } else if (data.unitate === "months") {
            dateObject.setMonth(dateObject.getMonth() + recurenta);
          } else if (data.unitate === "years") {
            year = dateObject.getFullYear() + recurenta;
          }
          let formattedDate = year + "-" + month + "-" + day;

          const container = document.querySelector("#event-" + formattedDate);
          let tagsHTML = "";
          data.tagevent.split(", ").forEach((tag) => {
            const tagElement = document.getElementById(tag);
            if (tagElement) {
              tagsHTML += `<span class="${tagElement.className} bg-opacity-75 text-white mt-2 tag-responsible">${tagElement.textContent}</span>`;
            }
          });

          let responsibleHTML = "";
          data.membru.split(", ").forEach((responsible) => {
            const responsibleElement = document.getElementById(responsible);
            if (responsibleElement) {
              responsibleHTML += `<span class="${responsibleElement.className} bg-opacity-75 text-white mt-2 tag-responsible">${responsibleElement.textContent}</span>`;
            }
          });

          if (container) {
            const eventNew = document.createElement("div");
            eventNew.id = data.id;
            eventNew.className = "m-1 p-1 text-white event container";
            eventNew.innerHTML =
              "<input class='form-check-input me-2 mark-event' type='checkbox'>" +
              data.addedevent +
              "<button type='button' class='btn-close close-event ms-3 delete-event' aria-label='Close'></button>";
            //   console.log(formattedDate)

            const subContainer = document.createElement("div");
            subContainer.className =
              "card ms-5 m-1 p-1 bg-primary bg-opacity-25 text-white event d-flex flex-column align-items-start event";

            const eventNewMeta = document.createElement("div");
            eventNewMeta.className = "align-self-end tags-responsible";
            eventNewMeta.innerHTML =
              "<span class='fs-7 lh-lg tag-responsible'>Tags: </span>" +
              tagsHTML +
              "<span class='fs-7 lh-lg tag-responsible'>  Responsible: </span>" +
              responsibleHTML;

            subContainer.append(eventNew, eventNewMeta);
            container.appendChild(subContainer);

            if (data.eventstatus === "true") {
              eventNew.querySelector(".mark-event").checked = true;
            }

            const upcomingEvents = document.createElement("div");
            upcomingEvents.id = data.id;
            upcomingEvents.className =
              "card ms-5 m-1 p-1 bg-secondary bg-opacity-25 text-white d-flex flex-row align-items-center";
            upcomingEvents.innerHTML =
              "<div class='card me-4 m-1 p-1 bg-white text-secondary'>" +
              formattedDate +
              "</div>" +
              data.addedevent;
            if (data.addedevent !== "") {
              document
                .querySelector(".upcoming-events")
                .appendChild(upcomingEvents);
            }
          }
        });
      });
      targetEvent();
      deleteEvent();
      markElement();
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

        const button = eventItem.querySelector("button");
        if (clickedItem !== button) {
          button.classList.add("close-event");
        }
      });

      if (
        clickedItem === item &&
        !clickedItem.classList.contains("mark-event") &&
        !clickedItem.classList.contains("tags-responsible") &&
        !clickedItem.classList.contains("tag-responsible")
      ) {
        clickedItem.classList.add("bg-secondary");
        clickedItem
          .querySelector(".delete-event")
          .classList.remove("close-event");
      } else if (
        !clickedItem.classList.contains("mark-event") &&
        !clickedItem.classList.contains("tags-responsible") &&
        !clickedItem.classList.contains("tag-responsible")
      ) {
        clickedItem.parentElement.classList.add("bg-secondary");
        clickedItem.parentElement
          .querySelector(".delete-event")
          .classList.remove("close-event");
      } else if (
        !clickedItem.classList.contains("tags-responsible") &&
        !clickedItem.classList.contains("tag-responsible")
      ) {
        clickedItem.parentElement.parentElement.classList.add("bg-secondary");
        clickedItem.parentElement.parentElement
          .querySelector(".delete-event")
          .classList.remove("close-event");
      }
      console.log(clickedItem.className);
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
    repeating: "",
    unit: "",
    tags: "",
    responsible: "",
  };

  saveBtn.addEventListener("click", async function () {
    const tagsArray = [];
    document.querySelector(".loadingscreen").classList.remove("hidden");
    const tags = document.querySelectorAll(".new-event-tag .new-badge-item");

    tags.forEach((tag) => {
      tagsArray.push(tag.textContent);
    });

    const responsibleArray = [];
    const responsibles = document.querySelectorAll(
      ".new-event-responsible .new-badge-responsible"
    );

    responsibles.forEach((responsible) => {
      responsibleArray.push(responsible.textContent);
    });

    eventDataObj.eventdate = document.querySelector(".new-date").value;
    eventDataObj.addedevent = document.querySelector(".new-event-body").value;
    eventDataObj.user = getCookie("username");
    eventDataObj.repeating = document.querySelector(".new-repeating").value;
    eventDataObj.unit = document.querySelector(".new-unit").value;
    eventDataObj.tags = tagsArray.join(", ");
    eventDataObj.responsible = responsibleArray.join(", ");

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
        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Added one event (" +
          document.querySelector(".new-event-body").value +
          ") in the Agenda for date " +
          document.querySelector(".new-date").value;
        sendToast();
        document.querySelector(".my-toast").classList.remove("hidden");
        setTimeout(function () {
          document.querySelector(".my-toast").classList.add("hidden");
          document.querySelector(".loadingscreen").classList.add("hidden");
          location.reload();
        }, 3000);
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
  addMemberNameToToast();
  saveEventData();
  bootstrapModal();
  addDate();
  getEvents();
  // targetEvent();
  // deleteEvent();
  displayRepeatingEvent();
  addRemoveTags();
  addRemoveResponsible();

  logout();
});
