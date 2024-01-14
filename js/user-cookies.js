function setCookie(name, value, daysToExpire) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    var cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function setUsernameCookie(username, member) {
    setCookie('username', username, 365);
    setCookie('member', member, 365);
}

function getUsernameCookie() {
    return {
        username: getCookie('username'),
        member: getCookie('member')
    };
}

function getUsernameLogin() {
    const loginButton = document.querySelector('.select-member');
    var storedUsername = getUsernameCookie();
    if (storedUsername.username && storedUsername.member) {
        console.log('Bine ai revenit, ' + storedUsername.username + ", " + storedUsername.member + '!');
    }

    let memberNameText;
if (window.location.pathname === "/"){
    const memberNames = document.querySelectorAll('.member');
    memberNames.forEach(function (memberName) {
        memberName.addEventListener('click', function (event) {
            memberNameText = event.target.textContent;

            memberNames.forEach(function (el) {
                el.classList.remove('member-border')
            });
            event.target.classList.add('member-border');
            });
    });

    loginButton.addEventListener('click', function () {
        const memberPopup = document.querySelector('.userName').textContent;
        console.log(memberPopup);
        if (memberPopup !== null) {
            var newUsername = document.querySelector('.userName').textContent;
            if (newUsername) {
                setUsernameCookie(newUsername, memberNameText);
            }
        } else {
            var newUsername = "Guest user";
        }
        console.log('Userul tau este ' + newUsername + " si membrul este " + memberNameText);
    });
}
}
document.addEventListener('DOMContentLoaded', function () {
    getUsernameLogin();
});
