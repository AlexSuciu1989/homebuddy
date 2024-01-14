function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for(let i = 0; i< cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length);
        }
    }

    return null;
}

function getUserGreeting(){
    const userName = getCookie("username");
    const memberName = getCookie("member");

        document.querySelector('.header-user').textContent = userName;
        document.querySelector('.header-member').textContent = memberName;
}


function logout(){
    const logoutButton = document.querySelector('.logout');

    logoutButton.addEventListener('click', function(){
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'member=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        console.log('buton apasat')

        window.location.href = "https://homebuddy.ro/";
    })
}


function changeFamilyMemberColor(){
    const familyMembers = document.querySelectorAll('.member-name');
    familyMembers.forEach(function(familyMember){
        
        familyMember.addEventListener('focus',function(){
        
            familyMember.style.backgroundColor = 'white';
            familyMember.style.color = '#7FC6C6';
        })

        familyMember.addEventListener('blur',function(){
        
            familyMember.style.backgroundColor = '#7FC6C6';
            familyMember.style.color = 'white';
        })
    })

}


function addFamilyMember(){
    const addButton = document.querySelector('.add-btn');

    addButton.addEventListener('click', function(){

        for(let i = 1; i <= 3; i++){
            const memberName = document.querySelector('.member'+i);
            //console.log(memberName);
            if(!memberName.classList.contains("visible")){
                memberName.classList.add("visible");
                break;
            }
        }
    })
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


function retrieveAccountInformation(){

    document.querySelector('.user-name').value = getCookie('username');

    fetch('./php/account-from-sql.php')
    .then(response =>response.json())
    .then(dataRetrieved => {
        console.log(dataRetrieved)

        document.querySelector('.phone-number').value = dataRetrieved[0].telefon;
        
        for(let i = 0; i<=3; i++){

            if(dataRetrieved[0].membru+(i+1) !== null){
            const memberName = document.querySelector('.member'+i)
            memberName.classList.add("visible");
            document.querySelector('.member'+i + ' .member-name').value = dataRetrieved[0]['membru'+(i+1)];
        }
        
        };


    })
}


function makeMemberButtonsHidden(){
    
    const memberIcons = ['.member0', '.member1','.member2', '.member3'];

    memberIcons.forEach((memberIcon)=>{
        if(document.querySelector(memberIcon+".member-name").textContent === ""){

        }
    })
}



document.addEventListener("DOMContentLoaded", function(){   
    getUserGreeting();
    addFamilyMember();
    saveAccountInformation();
    retrieveAccountInformation();
    changeFamilyMemberColor();
    logout();
   // makeMemberButtonsHidden()
})