
function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    let foundCookieValue = null;

    cookieArray.forEach(cookie => {
        let trimmedCookie = cookie.trim();
        if (trimmedCookie.indexOf(name) === 0) {
            foundCookieValue = trimmedCookie.substring(name.length);
        }
    });

    return foundCookieValue;
}




function getUserColorsArray(){
    const memberColorString = getCookie("memberColors");

    const decodedMemberColorString = decodeURIComponent(memberColorString).replace(/%2C%20/g, "_COMMA_");
    const rgbValues = decodedMemberColorString.match(/\d+,\s*\d+,\s*\d+/g);
    const memberColorArray = rgbValues.map(value => "rgb(" + value + ")");
    const memberNamesArray = decodeURIComponent(getCookie("memberNames")).split(',');
    const memberInfo = Object.fromEntries(memberNamesArray.map((name, index) => [name, memberColorArray[index]]));

    return memberInfo;
}

function getUserGreeting() {
    const userName = getCookie("username");
    const memberName = getCookie("member");

    const memberInfo = getUserColorsArray();

    document.querySelector('.header-user').textContent = userName;
    document.querySelector('.header-member').textContent = memberName;

    document.querySelector('.logout').style.backgroundColor = memberInfo[memberName];

    const r = document.querySelector(':root');
    r.style.setProperty('--theme', memberInfo[memberName]);
}


function logout(){
    const logoutButton = document.querySelector('.logout');



    logoutButton.addEventListener('click', function(){
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'member=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'memberColors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        console.log('buton apasat')

        window.location.href = "https://homebuddy.ro/";
    })
}





function addFamilyMember() {
    const addButton = document.querySelector('.add-btn');

    addButton.addEventListener('click', function () {
        const memberNames = document.querySelectorAll('.member0, .member1, .member2, .member3');
        let memberAdded = false;

        memberNames.forEach(member => {
            if (!member.classList.contains("visible") && !memberAdded) {
                member.classList.add("visible");
                memberAdded = true;
            }
        });
    });
}



function saveAccountInformation() {
    const saveButton = document.querySelector('.save-btn');

    saveButton.addEventListener('click', async function () {
        const familyMembers = document.querySelectorAll('.member-name , .phone-number , .user-name');

        const familyMembersArray = [...familyMembers].map(element => element.value);

        console.log("family members are " + familyMembersArray);
    
        try {
            const url ='./php/account-to-sql.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({familyMembersArray})
            });

            if (response.ok) {
                console.log(await response.text());
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error("Error:", error);
    }
    });
}


function retrieveAccountInformation() {
    document.querySelector('.user-name').value = getCookie('username');

    fetch('./php/account-from-sql.php')
        .then(response => response.json())
        .then(dataRetrieved => {
            console.log(dataRetrieved);

            document.querySelector('.phone-number').value = dataRetrieved[0].telefon;

            const memberNames = document.querySelectorAll('.member0, .member1, .member2, .member3');

            memberNames.forEach((member, i) => {
                const memberNameInput = member.querySelector('.member-name');
                memberNameInput.value = dataRetrieved[0][`membru${i + 1}`];

                if (memberNameInput.value !== "") {
                    member.classList.add("visible");
                }
            });
        })
        .catch(error => {
            console.error('Error fetching account information:', error);
        });
}



document.addEventListener("DOMContentLoaded", function(){  
    
    getUserGreeting();
    saveAccountInformation();
    retrieveAccountInformation();
    addFamilyMember();
    logout();
    
})