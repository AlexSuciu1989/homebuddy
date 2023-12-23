
document.addEventListener("DOMContentLoaded", function(){

    
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
