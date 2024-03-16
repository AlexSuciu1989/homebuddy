// function setupCarousel() {
//   const slides = document.querySelectorAll(".weekday-container");
//   slides.forEach((slide) => {
//     slide.addEventListener("click", (e) => {
//       // Remove "active" class from all slides
//       slides.forEach((slide) => {
//         slide.classList.remove("active");
//       });

//       // Add "active" class to the clicked slide
//       e.currentTarget.classList.add("active");

//     });
//   });
// }

import { newIngredientLine } from "./food-buddy/ingredients.js";
import { saveIngredients } from "./food-buddy/ingredients.js";
import { getIngredients } from "./food-buddy/ingredients.js";
import { addIngredientsToViewRecipe } from "./food-buddy/ingredients.js";
import { updateIngredients } from "./food-buddy/ingredients.js";
import { deleteIngredient } from "./food-buddy/ingredients.js";

function deleteRecipe() {
  const deleteRecipe = document.getElementById("form-button-delete");

  deleteRecipe.addEventListener("click", async function submitData(event) {
    event.preventDefault();

    const recipeID = document.querySelector(".form-recipe-id").value;
    const userName = getCookie("username");

    const recipeObject = {
      user: userName,
      recipeID: recipeID,
    };

    console.log(recipeObject);
    try {
      const response = await fetch(
        "https://homebuddy.ro/php/food-buddy-delete-sql.php",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(recipeObject),
        }
      );

      if (response.ok) {
        console.log(await response.text());

        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Deleted " +
          document.querySelector("#form-title").value +
          " from the familily recipes";
        sendToast();
        document.querySelector(".my-toast").classList.remove("hidden");
        setTimeout(function () {
          document.querySelector(".my-toast").classList.add("hidden");
        }, 5000);
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

function updateRecipe() {
  const updateRecipe = document.getElementById("form-button-update");

  updateRecipe.addEventListener("click", async function submitData(event) {
    event.preventDefault();
    const formTitle = document.getElementById("form-title").value;
    const formCategory = document.getElementById("form-category").value;
    const formDificulty = document.getElementById("form-dificulty").value;
    const formTextarea = document.getElementById("form-textarea").value;
    const recipeID = document.querySelector(".form-recipe-id").value;
    const userName = getCookie("username");

    const recipeObject = {
      title: formTitle,
      category: formCategory,
      dificulty: formDificulty,
      recipe: formTextarea,
      user: userName,
      recipeID: recipeID,
    };

    console.log(recipeObject);
    try {
      const response = await fetch(
        "https://homebuddy.ro/php/food-buddy-update-sql.php",
        {
          method: "UPDATE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(recipeObject),
        }
      );

      if (response.ok) {
        console.log(await response.text());

        updateIngredients();

        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Updated " +
          document.querySelector("#form-title").value +
          " in the familily recipes";
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

//Nu cred ca e necesara
function addMemberNameToToast() {
  document.querySelector(".toast-user").textContent = getCookie("member");
}

//Done
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

// function selectWeekday() {
//   const container = document.querySelector(".week-cards");
//   container.addEventListener("click", function (event) {
//     const weekdays = document.querySelectorAll(".weekday-container");
//     weekdays.forEach((weekday) => {
//       weekday.classList.remove("checked");
//     });
//     const selectedWeekday = event.target;
//     selectedWeekday.classList.add("checked");
//   });
// }

//Done
function viewRecipeForm() {
  document.getElementById("add-new-btn").addEventListener("click", function () {
    const popup = document.querySelector("#recipe-form");
    if (popup) {
      popup.style.visibility = "visible";

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  });
}

//Done
function cancelRecipeForm() {
  document
    .getElementById("form-button-cancel")
    .addEventListener("click", function () {
      const popupHide = document.querySelector("#recipe-form");

      if (popupHide) {
        popupHide.style.visibility = "hidden";
        const formContainer = document.querySelector("#recipe-form");
        document.querySelector("div.recipe-form").style.top = "20px";
        document.querySelector("#imagePreview").style.display = "none";
        document.querySelector("#addButton").style.display = "flex";
        formContainer.querySelector("h2").style.display = "block";
        formContainer.querySelector("p").style.display = "block";
        formContainer.querySelector("#form-title").value = "";
        formContainer.querySelector("#form-title").readOnly = false;
        formContainer.querySelector("#form-textarea").value = "";
        // formContainer.querySelector("#form-textarea").readOnly = false;
        formContainer.querySelector("#form-category").value = "";
        // formContainer.querySelector("#form-category").disabled = false;
        formContainer.querySelector("#form-dificulty").value = "";
        formContainer.querySelector(".form-recipe-id").value = "";
        // formContainer.querySelector("#form-dificulty").disabled = false;
        document.querySelector(".form-button-save").style.visibility =
          "inherit";
        document.querySelector(".form-button-update").style.visibility =
          "hidden";
        document.querySelector(".form-button-delete").style.visibility =
          "hidden";
        const existingIngredients = document.querySelectorAll(
          ".recipe-ingredient-view"
        );
        existingIngredients.forEach((ingredient) => {
          ingredient.remove();
        });

        document.querySelector(".new-recipe-ingredient").style.display = "flex";
      }
    });
}

//Done
function addRecipeImage() {
  const clickButton = document.getElementById("form-image");
  const standardButton = document.getElementById("fileInput");
  const imagePreview = document.getElementById("imagePreview");
  const addButton = document.getElementById("addButton");
  const imgClose = document.getElementById("img-close");
  const removeImageBtn = document.getElementById("img-close");

  clickButton.addEventListener("click", function () {
    standardButton.click();
  });

  standardButton.addEventListener("change", function () {
    const selectedFiles = fileInput.files;
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      displayImage(file);
    }
  });

  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      addButton.style.display = "none";
      imgClose.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  removeImageBtn.addEventListener("click", function () {
    fileInput.value = "";
    imagePreview.src = "";
    imagePreview.style.display = "none";
    removeImageBtn.style.display = "none";
    addButton.style.display = "flex";
  });
}

//Done
function saveRecipeToSQL() {
  const saveRecipe = document.getElementById("form-save-recipe");

  saveRecipe.addEventListener("click", async function submitData(event) {
    event.preventDefault();
    const existingIngredients = document.querySelectorAll(
      ".recipe-ingredient-view"
    );
    existingIngredients.forEach((ingredient) => {
      ingredient.remove();
    });
    const formTitle = document.getElementById("form-title").value;
    const formCategory = document.getElementById("form-category").value;
    const formDificulty = document.getElementById("form-dificulty").value;
    const formTextarea = document.getElementById("form-textarea").value;
    const formImage = document.getElementById("fileInput");
    let fileName;

    if (formImage == null || formImage.files.length === 0) {
      fileName = "default-recipe-image.jpg";
    } else {
      let files = formImage.files;
      let fileNameExtension = files[0].name.split(".").pop();
      fileName = formTitle.replace(/\s+/g, "_") + "." + fileNameExtension;
    }
    const userName = getCookie("username");

    const recipeObject = {
      title: formTitle,
      category: formCategory,
      dificulty: formDificulty,
      recipe: formTextarea,
      image: fileName,
      user: userName,
    };

    console.log(recipeObject);
    try {
      const response = await fetch(
        "https://homebuddy.ro/php/food-buddy-to-sql.php",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(recipeObject),
        }
      );

      if (response.ok) {
        console.log(await response.text());
        document.querySelector("#recipe-form").style.visibility = "hidden";

        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Added " +
          document.querySelector("#form-title").value +
          " in the familily recipes";
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

    //incarc imaginea pe server
    const fileInput = document.getElementById("fileInput");

    if (fileInput == null || fileInput.files.length === 0) {
      fileName = "default-recipe-image.jpg";
    } else {
      let files = formImage.files;
      let fileNameExtension = files[0].name.split(".").pop();
      fileName = formTitle.replace(/\s+/g, "_") + "." + fileNameExtension;

      const file = fileInput.files[0];
      const fileExtension = file.name.split(".").pop(); // Get the original file extension
      let imageUploadName = document.querySelector(".form-title").value;
      imageUploadName =
        imageUploadName.replace(/\s+/g, "_") + "." + fileExtension;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("imageUploadName", imageUploadName);

        fetch("https://homebuddy.ro/php/food-buddy-file-upload.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("File uploaded:", data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      } else {
        console.error("No file selected.");
      }
    }
  });
}

//Done
async function openRecipe() {
  const recipesContainer = document.querySelectorAll(".view-recipe");
  const formContainer = document.querySelector("#recipe-form");

  recipesContainer.forEach(function (recipeContainer) {
    recipeContainer.addEventListener("click", async function (event) {
      const existingIngredients = document.querySelectorAll(
        ".recipe-ingredient-view"
      );
      existingIngredients.forEach((ingredient) => {
        ingredient.remove();
      });

      document.querySelector(".new-recipe-ingredient").style.display = "none";
      const selectedRecipeCard = event.target;
      const formImagePopulated =
        selectedRecipeCard.parentElement.querySelector("img");
      const formTitlePopulated =
        selectedRecipeCard.parentElement.querySelector("h1");
      const formTextareaPopulated =
        selectedRecipeCard.parentElement.querySelector(".descriere");
      const formCategoriePopulated =
        selectedRecipeCard.parentElement.querySelector(".recipe-cat");
      const formDificultatePopulated =
        selectedRecipeCard.parentElement.querySelector(".recipe-dif");
      const formIDPopulated =
        selectedRecipeCard.parentElement.querySelector(".recipe-id");

      // Wait for the ingredients to be added to the view recipe
      const viewRecipeIngredients = await addIngredientsToViewRecipe(
        formTitlePopulated.textContent
      );

      // Rest of your code to populate the form and adjust its appearance
      document.querySelector("#recipe-form").style.visibility = "visible";
      document.querySelector(".form-button-save").style.visibility = "hidden";
      document.querySelector(".form-button-update").style.visibility =
        "visible";
      document.querySelector(".form-button-delete").style.visibility =
        "visible";
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      document.querySelector("div.recipe-form").style.top = "20px";
      document.querySelector("#imagePreview").src = formImagePopulated.src;
      document.querySelector("#imagePreview").style.display = "block";
      document.querySelector("#addButton").style.display = "none";
      formContainer.querySelector("h2").style.display = "none";
      formContainer.querySelector("p").style.display = "none";
      formContainer.querySelector("#form-title").value =
        formTitlePopulated.textContent;
      formContainer.querySelector("#form-title").readOnly = true;
      formContainer.querySelector("#form-textarea").value =
        formTextareaPopulated.textContent;
      formContainer.querySelector(".form-recipe-id").value =
        formIDPopulated.textContent;
      // formContainer.querySelector("#form-textarea").readOnly = true;
      formContainer.querySelector("#form-category").value =
        formCategoriePopulated.textContent.replace(/^Category:\s*|\s*$/g, "");
      // formContainer.querySelector("#form-category").disabled = true;
      formContainer.querySelector("#form-dificulty").value =
        formDificultatePopulated.textContent.replace(
          /^Difficulty:\s*|\s*$/g,
          ""
        );
      // formContainer.querySelector("#form-dificulty").disabled = true;

      viewRecipeIngredients.forEach((ingredient) => {
        const newLine = document.createElement("div");
        newLine.className = "recipe-ingredient-view input-group p-1";
        newLine.innerHTML = `<div class='ingredient-id' style=display:none>${ingredient.id}</div><input type='text' class='recipe-ingredient-name form-control form-control-sm text-center' value='${ingredient.numeingredient}'/> <input type='number' class='recipe-ingredient-quantity form-control form-control-sm  text-center' value='${ingredient.cantitateingredient}'/> <input type='text' class='recipe-ingredient-unit form-control form-control-sm  text-center' value='${ingredient.unitateingredient}'/> <button type="button" class="btn-close bg-danger form-control form-control-sm ingredient-close-button" id="delete-${ingredient.id}" aria-label="Close"></button>`;
        document.querySelector(".new-recipe-ingredients").appendChild(newLine);
      });
      deleteIngredient();
    });
  });
}

function getRecipefromSQL() {
  const loggedUser = getCookie("username");
  fetch(
    "https://homebuddy.ro/php/food-buddy-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser)
  )
    .then((response) => response.json())
    .then((data) => {
      const section = document.getElementById("section");
      for (let key = 0; key < data.length; key++) {
        let element = data[key];

        const newImage = document.createElement("img");
        newImage.src = "https://homebuddy.ro/uploads/" + element.uploadedfile;
        newImage.className = "recipe-image";

        const newArticle = document.createElement("article");
        newArticle.className = "recipe-article";
        newArticle.id = element.titlu;

        const newTitle = document.createElement("h1");
        newTitle.id = "recipe-title";
        newTitle.textContent = element.titlu;

        const newCategory = document.createElement("div");
        newCategory.className = "recipe-cat";
        newCategory.textContent = "Category: " + element.categorie;

        const newDificulty = document.createElement("div");
        newDificulty.className = "recipe-dif";
        newDificulty.textContent = "Difficulty: " + element.dificultate;

        const newDescription = document.createElement("div");
        newDescription.className = "descriere";
        newDescription.textContent = element.ingrediente;

        const newRecipeTags = document.createElement("div");
        newRecipeTags.className = "recipe-tags";

        const newRecipeID = document.createElement("div");
        newRecipeID.id = element.id;
        newRecipeID.textContent = element.id;
        newRecipeID.className = "recipe-id";
        newRecipeID.style.display = "none";

        section.appendChild(newArticle);
        newRecipeTags.append(newCategory, newDificulty);
        newArticle.append(
          newImage,
          newTitle,
          newRecipeTags,
          newDescription,
          newRecipeID
        );

        const sidebar = document.createElement("div");
        sidebar.className = "sidebar-add";

        const monday = document.createElement("div");
        monday.className = "sidebar-btn";
        monday.id = "mon" + key;
        monday.textContent = "Mon";

        const tuesday = document.createElement("div");
        tuesday.className = "sidebar-btn";
        tuesday.id = "tue" + key;
        tuesday.textContent = "Tue";

        const wednesday = document.createElement("div");
        wednesday.className = "sidebar-btn";
        wednesday.id = "wed" + key;
        wednesday.textContent = "Wed";

        const thursday = document.createElement("div");
        thursday.className = "sidebar-btn";
        thursday.id = "thu" + key;
        thursday.textContent = "Thu";

        const friday = document.createElement("div");
        friday.className = "sidebar-btn";
        friday.id = "fri" + key;
        friday.textContent = "Fri";

        const saturday = document.createElement("div");
        saturday.className = "sidebar-btn";
        saturday.id = "sat" + key;
        saturday.textContent = "Sat";

        const sunday = document.createElement("div");
        sunday.className = "sidebar-btn";
        sunday.id = "sun" + key;
        sunday.textContent = "Sun";

        const viewRecipe = document.createElement("div");
        viewRecipe.className = "view-recipe";
        viewRecipe.textContent = "See Recipe";
        viewRecipe.id = "view-recipe" + key;

        sidebar.append(
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        );
        newArticle.appendChild(viewRecipe);

        newArticle.appendChild(sidebar);

        const hiddenKey = document.createElement("p");
        hiddenKey.display = "none";
        hiddenKey.id = key;

        newArticle.appendChild(hiddenKey);
      }

      let buttons = document.querySelectorAll(".sidebar-btn");
      console.log(buttons);

      buttons.forEach(function (button) {
        button.addEventListener("click", function (event) {
          let weekId = event.target.id;
          let weekElement = document.getElementById(weekId);
          let weekParent = weekElement.parentElement;
          let closestH1 = weekElement.closest("article").querySelector("h1");
          let h1TextContent = closestH1.textContent;
          let hiddenKeyElement = weekElement
            .closest("article")
            .querySelector("p");
          let hiddenKeyId = hiddenKeyElement.id;
          let newDiv = document.createElement("div");
          newDiv.id = weekId + "-" + h1TextContent;
          newDiv.classList.add("list");
          console.log(weekId);
          if (weekId) {
            if (weekElement) {
              if (weekElement.style.backgroundColor === "rgb(250, 172, 96)") {
                weekElement.style.backgroundColor = null;
                weekElement.style.color = null;
                let existingDiv = document.getElementById(
                  weekId + "-" + h1TextContent
                );
                if (existingDiv) {
                  existingDiv.remove();

                  const dateAndTime = new Date();
                  let formattedDateTime = dateAndTime.toLocaleString();
                  document.querySelector(".toast-time").textContent =
                    formattedDateTime;
                  const toastText = document.querySelector(".toast-content");
                  toastText.textContent =
                    "Removed " + h1TextContent + " from the weekmenu.";
                  sendToast();
                  document
                    .querySelector(".my-toast")
                    .classList.remove("hidden");
                  setTimeout(function () {
                    document.querySelector(".my-toast").classList.add("hidden");
                  }, 5000);
                }

                var weekArr = [
                  "mon" + hiddenKeyId,
                  "tue" + hiddenKeyId,
                  "wed" + hiddenKeyId,
                  "thu" + hiddenKeyId,
                  "fri" + hiddenKeyId,
                  "sat" + hiddenKeyId,
                  "sun" + hiddenKeyId,
                ];
                for (var i = 0; i < weekArr.length; i++) {
                  var dayElement = document.getElementById(weekArr[i]);
                  if (
                    dayElement.style.backgroundColor === "rgb(250, 172, 96)" ||
                    dayElement.style.backgroundColor === "#FAAC60"
                  ) {
                    weekParent.style.display = "flex";
                    break;
                  } else {
                    weekParent.style.display = null;
                  }
                }
              } else {
                weekElement.style.backgroundColor = "#FAAC60";
                weekElement.style.color = "white";
                weekParent.style.display = "flex";
                if (closestH1) {
                  let parentDiv = document.getElementById(
                    weekId.substring(0, 3) + "-day"
                  );
                  newDiv.innerHTML = h1TextContent;
                  parentDiv.appendChild(newDiv);

                  const dateAndTime = new Date();
                  var formattedDateTime = dateAndTime.toLocaleString();
                  document.querySelector(".toast-time").textContent =
                    formattedDateTime;
                  const toastText = document.querySelector(".toast-content");
                  toastText.textContent =
                    "Added " + h1TextContent + " in the weekmenu.";
                  sendToast();
                  document
                    .querySelector(".my-toast")
                    .classList.remove("hidden");
                  setTimeout(function () {
                    document.querySelector(".my-toast").classList.add("hidden");
                  }, 5000);
                }
              }
            }
          }
        });
      });

      openRecipe();
    });
}

function getDateIntervalFromWeekNo(year, weekNumber) {
  const januaryFirst = new Date(year, 0, 1);
  const daysOffset = (januaryFirst.getDay() + 6) % 7;

  const startDate = new Date(year, 0, 1 + weekNumber * 7 - daysOffset);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  return {
    start: startDate.toISOString().split("T")[0],
    end: endDate.toISOString().split("T")[0],
  };
}

function clearContainers() {
  let menuContainers = document.querySelectorAll(".list-container");

  menuContainers.forEach((menuContainer) => {
    while (menuContainer.firstChild) {
      menuContainer.removeChild(menuContainer.firstChild);
    }
  });
}

function deleteItem() {
  var weekmenus = document.querySelectorAll(".list");
  var cards = document.querySelectorAll(".d-none");
  var checkedCard = "";
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      const cardArray = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"];
      for (let i = 0; i < cardArray.length; i++) {
        if (document.querySelector("#" + cardArray[i]).checked === true) {
          checkedCard = cardArray[i];
        }
      }
    });
  });

  weekmenus.forEach(function (weekmenu) {
    weekmenu.addEventListener("click", function (event) {
      let menuItem = event.target.id;
      let menuItemContainer = document.querySelector("#" + menuItem);
      let menuItemCard =
        menuItemContainer.parentElement.parentElement.parentElement.getAttribute(
          "for"
        );

      if (menuItemCard === checkedCard) {
        const elementsToDelete = document.querySelectorAll(
          "#" + menuItem + ".weekmenu-item-delete"
        );

        elementsToDelete.forEach(function (element) {
          element.remove();
        });

        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Deleted " +
          document.querySelector("#" + menuItem).textContent +
          " from " +
          document.querySelector(
            "#" +
              "slide" +
              checkedCard[checkedCard.length - 1] +
              " .weekday span"
          ).textContent +
          " in " +
          document.querySelector(".weekno").textContent;
        sendToast();
        document.querySelector(".my-toast").classList.remove("hidden");
        setTimeout(function () {
          document.querySelector(".my-toast").classList.add("hidden");
        }, 5000);

        document.querySelector("#" + menuItem).remove();
        console.log("Deleting item:", menuItem);
      }
    });
  });
}

async function fetchAndDisplayWeeklyMenu() {
  function extractObjects(responseData, weekId) {
    return responseData.map((obj) => obj[weekId]);
  }
  const loggedUser = getCookie("username");
  try {
    const weeknumber = document.querySelector(".weekno").innerHTML.trim();
    // console.log(weeknumber);

    // First fetch request
    const response = await fetch(
      "https://homebuddy.ro/php/food-buddy-weekmenu-from-sql.php?loggedUser=" +
        encodeURIComponent(loggedUser),
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          weeknumber: encodeURIComponent(weeknumber),
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);

      const weekId = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

      for (let i = 0; i < weekId.length; i++) {
        let weekIdValue = weekId[i];
        const result = extractObjects(responseData, weekIdValue);
        let resultArr;
        if (result == "") {
          resultArr = "";
        } else {
          resultArr = result[0].split(",");
          if (resultArr == undefined) {
            resultArr = "";
          }
        }
        //console.log(resultArr);

        const deleteButton = document.createElement("span");
        deleteButton.textContent = "  delete";
        deleteButton.className = "weekmenu-item-delete";
        //deletebutton.style.display = 'none';
        deleteButton.style.fontSize = "8px";

        let dayContainer = document.querySelector("#" + weekIdValue + "-day");
        for (let n = 0; n < resultArr.length; n++) {
          const newItem = document.createElement("div");
          newItem.className = "list";
          newItem.id = weekIdValue + "-" + n;
          newItem.textContent = resultArr[n];
          newItem.style.position = "relative";

          const deleteButton = document.createElement("span");
          deleteButton.textContent = "  click item to delete";
          deleteButton.className = "weekmenu-item-delete";

          dayContainer.appendChild(newItem).appendChild(deleteButton);
        }
      }
    } else {
      console.error("Failed to submit data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  deleteItem();
}

async function weekNumberArrows() {
  let today = new Date();
  let year = today.getFullYear();
  let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  let timeDifference = today - firstDayOfYear;
  let weekNumber = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
  const siteDateInterval = document.querySelector(".site-date-interval");
  document.querySelector(".weekno").innerHTML = "Week " + weekNumber;

  fetchAndDisplayWeeklyMenu();

  const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
  siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;

  if (weekNumber === 1) {
    document.querySelector(".arrow-left").style.display = "none";
  } else if (weekNumber === 52) {
    document.querySelector(".arrow-right").style.display = "none";
  }

  let weekDecreaseIncrease = document.querySelectorAll(
    ".arrow-left, .arrow-right"
  );

  weekDecreaseIncrease.forEach(function (weekDecrIncr) {
    weekDecrIncr.addEventListener("click", async function () {
      if (
        weekDecrIncr === document.querySelector(".arrow-left") &&
        weekNumber > 1
      ) {
        weekNumber = weekNumber - 1;
        clearContainers();
        getIngredients();
        const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
        console.log(
          `Week ${weekNumber} of ${year} starts on ${dateInterval.start} and ends on ${dateInterval.end}`
        );
        siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;
        document.querySelector(".arrow-right").style.display = "inline-block";
      } else if (
        weekDecrIncr === document.querySelector(".arrow-right") &&
        weekNumber < 52
      ) {
        weekNumber = weekNumber + 1;
        clearContainers();
        getIngredients();
        const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
        siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;

        document.querySelector(".arrow-left").style.display = "inline-block";
      } else if (
        weekDecrIncr === document.querySelector(".arrow-left") &&
        weekNumber < 2
      ) {
        year = today.getFullYear() - 1;
        console.log(year);
        clearContainers();
        getIngredients();
        const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
        siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;
      }

      if (weekNumber === 1) {
        document.querySelector(".arrow-left").style.display = "none";
      } else if (weekNumber === 52) {
        document.querySelector(".arrow-right").style.display = "none";
      }

      document.querySelector(".weekno").innerHTML = "Week " + weekNumber;

      fetchAndDisplayWeeklyMenu();
    });
  });
}

function saveWeekmenuToSQL() {
  const uploadWeekmenu = document.querySelector(".submit-weekmenu");

  uploadWeekmenu.addEventListener("click", async function () {
    const elementsToDelete = document.querySelectorAll(".weekmenu-item-delete");

    elementsToDelete.forEach(function (element) {
      element.remove();
    });

    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const weekNo = document.querySelector(".weekno").textContent.trim();
    const userName = getCookie("username");
    const menuData = new FormData();
    menuData.append("weekno", weekNo);
    menuData.append("username", userName);

    for (let i = 0; i < weekdays.length; i++) {
      const weekMenuParent = document.getElementById(weekdays[i] + "-day");
      const weekMenu = weekMenuParent.querySelectorAll("div");
      const weekMenuArray = Array.from(weekMenu);
      const contentArray = weekMenuArray.map((childDiv) =>
        childDiv.textContent.trim()
      );

      // Append each day's contentArray to the FormData
      menuData.append(weekdays[i], contentArray.join(","));
    }

    try {
      const url = "https://homebuddy.ro/php/food-buddy-weekmenu-to-sql.php";

      const response = await fetch(url, {
        method: "POST",
        body: menuData,
      });

      if (response.ok) {
        console.log(await response.text());
        //location.reload();

        const dateAndTime = new Date();
        var formattedDateTime = dateAndTime.toLocaleString();
        document.querySelector(".toast-time").textContent = formattedDateTime;
        const toastText = document.querySelector(".toast-content");
        toastText.textContent =
          "Saved the Week Menu for " +
          document.querySelector(".weekno").textContent +
          ".";
        sendToast();
        getIngredients();

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
}

document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayWeeklyMenu();
  weekNumberArrows();
  getUserGreeting();
  addMemberNameToToast();
  viewRecipeForm();
  cancelRecipeForm();
  addRecipeImage();
  saveRecipeToSQL();
  getRecipefromSQL();
  saveWeekmenuToSQL();
  newIngredientLine();
  saveIngredients(document.querySelector(".form-button-save"));
  saveIngredients(document.querySelector(".form-button-update"));
  getIngredients();
  updateRecipe();
  deleteRecipe();

  // setupCarousel();
  logout();
  // selectWeekday()
});
