export async function sendToast() {
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

export const toggleToast = () => {
  document.querySelector(".my-toast").classList.remove("hidden");
  setTimeout(function () {
    document.querySelector(".my-toast").classList.add("hidden");
  }, 5000);
};
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
