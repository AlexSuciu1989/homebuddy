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

async function sendToast() {

    const userName = getCookie("username");
    const familyMember = getCookie("member");
    const dateTime = document.querySelector('.toast-time').textContent;
    const toastContent = document.querySelector('.toast-content').textContent;

    try {
        const response = await fetch('./php/toast-to-sql.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                userName: encodeURIComponent(userName),
                familyMember: encodeURIComponent(familyMember),
                dateTime: encodeURIComponent(dateTime),
                toastContent: encodeURIComponent(toastContent),
            }),
        });

        if (response.ok) {
            console.log(await response.text());
            
        } else {
            console.error('Failed to submit data');
        }
    } catch (error) {
        console.error('Error:', error);
    }

};


document.addEventListener("DOMContentLoaded", function() {

    
 


const saveRecipe = document.getElementById('form-save-recipe');

saveRecipe.addEventListener('click', async function submitData(event) {
    event.preventDefault();
    const formTitle = document.getElementById('form-title').value;
    const formCategory = document.getElementById('form-category').value;
    const formDificulty = document.getElementById('form-dificulty').value;
    const formTextarea = document.getElementById('form-textarea').value;
    const formImage = document.getElementById('fileInput');
    let files = formImage.files;
    let fileName = files[0].name;
    const userName = getCookie("username");
    console.log(userName);
    try {
        const response = await fetch('./php/food-buddy-to-sql.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                formTitle: encodeURIComponent(formTitle),
                formCategory: encodeURIComponent(formCategory),
                formDificulty: encodeURIComponent(formDificulty),
                formTextarea: encodeURIComponent(formTextarea),
                fileName: encodeURI(fileName),
                userName: encodeURI(userName),
            }),
        });

        if (response.ok) {
            console.log(await response.text());
            document.querySelector('#recipe-form').style.visibility = "hidden";


            const dateAndTime =  new Date();
                var formattedDateTime = dateAndTime.toLocaleString();
                document.querySelector('.toast-time').textContent = formattedDateTime;
                const toastText = document.querySelector('.toast-content');
                toastText.textContent = "Added " + document.querySelector('#form-title').value + " in the familily recipes";
                sendToast()
                document.querySelector('.toast').classList.remove('hidden');
                setTimeout(function(){
                    document.querySelector('.toast').classList.add('hidden');
                }, 5000);

                


        } else {
            console.error('Failed to submit data');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    //incarc imaginea pe server
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('./php/food-buddy-file-upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded:', data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    } else {
        console.error('No file selected.');
    }
});
});
