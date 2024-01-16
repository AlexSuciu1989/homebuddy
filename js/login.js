let userData;

function randomMemberColor(){
    const colorsArray = ['#e69138', '#ffd966', '#abc69f', '#73a7b3', '#aaaaaa', '#ffec93', '#93a6ff', '#93c47d', '#8e7cc3']

    for (let i = 1; i<= 4; i++){
        let selectedColorIndex = Math.floor(Math.random() * colorsArray.length);
        let selectedColor = colorsArray[selectedColorIndex];
        document.querySelector('.member'+ i).style.backgroundColor = selectedColor;

        colorsArray.splice(selectedColorIndex, 1)
    }
}

function submitLoginForm() {
    return new Promise((resolve, reject) => {
        document.getElementById('login-form').addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const loginMessageBox = document.querySelector('.login-message');
            fetch('./php/login.php', {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    
                }

                return response.json();
                
            })
            .then(dataRetrieved => {
                userData = dataRetrieved;
                resolve(userData); // Resolve the promise with userData
                
                const memberSelectForm = document.querySelector('.member-selection-popup');
                memberSelectForm.style.display = 'flex';
                loginMessageBox.textContent = '';
                randomMemberColor();
            })
            .catch(error => {
                //console.error('Form submission error:', error);
                //reject(error); // Reject the promise with the error

                
                loginMessageBox.textContent = 'Username or password are not correct!';
            });
        });
    });
}

function selectMember(){

    document.querySelector('.userName').textContent = userData.account;

    for (let i = 1; i<=4; i++){
        document.querySelector('.member'+i).textContent = userData['membru'+i];
    }
    
}


function enterLandingPage() {
    const doneButton = document.querySelector('.select-member');

    doneButton.addEventListener('click', function(){
        window.location.href = "https://homebuddy.ro/account.html";
    })
}

document.addEventListener('DOMContentLoaded', function(){
    
    
    
    submitLoginForm().then(() => {
        // userData is now available
        
        selectMember()
        console.log(userData);
    });
    enterLandingPage()
});
