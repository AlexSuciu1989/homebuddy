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


function addMemberNameToToast(){
    document.querySelector('.toast-user').textContent = getCookie("member");
}

document.addEventListener("DOMContentLoaded", function(){

    getUserGreeting()
    addMemberNameToToast()

    document.getElementById("add-new-btn").addEventListener("click", function(){
        var popup = document.querySelector("#recipe-form");
        if(popup){
        popup.style.visibility="visible";
        
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
        }
    });

    document.getElementById("form-button-cancel").addEventListener("click", function(){
        var popupHide = document.querySelector("#recipe-form");
        if(popupHide){
            popupHide.style.visibility="hidden";
            const formContainer = document.querySelector('#recipe-form');
            document.querySelector('div.recipe-form').style.top = '20px';
            
            document.querySelector('#imagePreview').style.display = 'none';
            document.querySelector('#addButton').style.display = 'flex';
            formContainer.querySelector('h2').style.display = 'block';
            formContainer.querySelector('p').style.display = 'block';
            formContainer.querySelector('#form-title').value = "";
            formContainer.querySelector('#form-title').readOnly = false;
            formContainer.querySelector('#form-textarea').value = "";
            formContainer.querySelector('#form-textarea').readOnly = false;
            formContainer.querySelector('#form-category').value = "";
            formContainer.querySelector('#form-category').disabled = false;
            formContainer.querySelector('#form-dificulty').value = "";
            formContainer.querySelector('#form-dificulty').disabled = false;
        }
        });

    var clickButton = document.getElementById("form-image");
    var standardButton = document.getElementById("fileInput");
    var imagePreview = document.getElementById("imagePreview");
    var addButton = document.getElementById("addButton");
    var imgClose = document.getElementById("img-close");
    var removeImageBtn = document.getElementById("img-close");

    clickButton.addEventListener("click",function(){
        standardButton.click();
    });

    standardButton.addEventListener("change", function(){
        var selectedFiles = fileInput.files;
        if(selectedFiles.length > 0 ){
            var file = selectedFiles[0];
            displayImage(file);
        }
    });

    function displayImage(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
            addButton.style.display = "none";
            imgClose.style.display ="block";     
        };
        reader.readAsDataURL(file);
    }

    removeImageBtn.addEventListener("click", function() {
        fileInput.value = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        removeImageBtn.style.display = "none";
        addButton.style.display = "flex";
    });

});
