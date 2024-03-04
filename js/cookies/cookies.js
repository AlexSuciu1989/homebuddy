export function getCookie(cookieName) {
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
