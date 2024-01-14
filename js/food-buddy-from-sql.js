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



function openRecipe() {
    const recipesContainer = document.querySelectorAll('.view-recipe');
    const formContainer = document.querySelector('#recipe-form');

    recipesContainer.forEach(function (recipeContainer) {
        recipeContainer.addEventListener('click', function (event) {
            const selectedRecipeCard = event.target;
console.log(event.target.id);
            
        const formImagePopulated = selectedRecipeCard.parentElement.querySelector('img');
        const formTitlePopulated = selectedRecipeCard.parentElement.querySelector('h1');
        const formTextareaPopulated = selectedRecipeCard.parentElement.querySelector('.descriere');
        const formCategoriePopulated = selectedRecipeCard.parentElement.querySelector('.recipe-cat');
        const formDificultatePopulated = selectedRecipeCard.parentElement.querySelector('.recipe-dif');
        document.querySelector('#recipe-form').style.visibility = 'visible';
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
        document.querySelector('div.recipe-form').style.top = '20px';
        document.querySelector('#imagePreview').src = formImagePopulated.src;
        document.querySelector('#imagePreview').style.display = 'block';
        document.querySelector('#addButton').style.display = 'none';
        formContainer.querySelector('h2').style.display = 'none';
        formContainer.querySelector('p').style.display = 'none';
        formContainer.querySelector('#form-title').value = formTitlePopulated.textContent;
        formContainer.querySelector('#form-title').readOnly = true;
        formContainer.querySelector('#form-textarea').value = formTextareaPopulated.textContent;
        formContainer.querySelector('#form-textarea').readOnly = true;
        formContainer.querySelector('#form-category').value = formCategoriePopulated.textContent.replace(/^Categorie:\s*|\s*$/g, '');
        formContainer.querySelector('#form-category').disabled = true;
        formContainer.querySelector('#form-dificulty').value = formDificultatePopulated.textContent.replace(/^Dificultate:\s*|\s*$/g, '');
        formContainer.querySelector('#form-dificulty').disabled = true;


        });
    });
}


document.addEventListener('DOMContentLoaded', function() {

fetch('./php/food-buddy-from-sql.php')
.then(response => response.json())
.then(data => {
    
    const section = document.getElementById('section');
    for (let key = 0; key < data.length; key++) {
        
        let element = data[key];

        const newImage = document.createElement('img');
        newImage.src = './uploads/' + element.uploadedfile
        newImage.className = 'recipe-image';

        const newArticle = document.createElement('article');
        newArticle.className = 'recipe-article'
        newArticle.id = element.titlu;

        const newTitle = document.createElement('h1');
        newTitle.id = 'recipe-title';
        newTitle.textContent = element.titlu;

        const newCategory = document.createElement('div');
        newCategory.className = 'recipe-cat';
        newCategory.textContent = "Categorie: " + element.categorie;

        const newDificulty = document.createElement('div');
        newDificulty.className = 'recipe-dif';
        newDificulty.textContent = 'Dificultate: ' + element.dificultate;

        const newDescription = document.createElement('div');
        newDescription.className = 'descriere';
        newDescription.textContent = element.ingrediente;

        const newRecipeTags = document.createElement('div');
        newRecipeTags.className = 'recipe-tags';

        section.appendChild(newArticle);
        newRecipeTags.append(newCategory, newDificulty);
        newArticle.append(newImage, newTitle, newRecipeTags, newDescription);



        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar-add';

        const monday = document.createElement('div');
        monday.className = 'sidebar-btn';
        monday.id = 'mon' + key;
        monday.textContent = 'Mon';

        const tuesday = document.createElement('div');
        tuesday.className = 'sidebar-btn';
        tuesday.id = 'tue'  + key;
        tuesday.textContent = 'Tue';

        const wednesday = document.createElement('div');
        wednesday.className = 'sidebar-btn';
        wednesday.id = 'wed'  + key;
        wednesday.textContent = 'Wed';

        const thursday = document.createElement('div');
        thursday.className = 'sidebar-btn';
        thursday.id = 'thu'  + key;
        thursday.textContent = 'Thu';

        const friday = document.createElement('div');
        friday.className = 'sidebar-btn';
        friday.id = 'fri'  + key;
        friday.textContent = 'Fri';

        const saturday = document.createElement('div');
        saturday.className = 'sidebar-btn';
        saturday.id = 'sat'  + key;
        saturday.textContent = 'Sat';

        const sunday = document.createElement('div');
        sunday.className = 'sidebar-btn';
        sunday.id = 'sun'  + key;
        sunday.textContent = 'Sun';
        
        const viewRecipe = document.createElement('div');
        viewRecipe.className = 'view-recipe';
        viewRecipe.textContent = 'Vezi Reteta';
        viewRecipe.id = 'view-recipe' + key;

        sidebar.append(monday, tuesday, wednesday, thursday, friday, saturday, sunday);
        newArticle.appendChild(viewRecipe);


        
        newArticle.appendChild(sidebar);


        const hiddenKey = document.createElement('p');
        hiddenKey.display = 'none';
        hiddenKey.id = key;

        newArticle.appendChild(hiddenKey);
    }

    var buttons = document.querySelectorAll('.sidebar-btn');
    console.log(buttons);
    
    
    buttons.forEach(function(button) {
    
    button.addEventListener('click', function(event) {
        var weekId = event.target.id;
        var weekElement = document.getElementById(weekId);
        var weekParent = weekElement.parentElement;
        var closestH1 = weekElement.closest('article').querySelector('h1');
        var h1TextContent = closestH1.textContent;
        var hiddenKeyElement = weekElement.closest('article').querySelector('p');
        var hiddenKeyId = hiddenKeyElement.id;
        let newDiv = document.createElement("div");
        newDiv.id = weekId + "-" + h1TextContent;
        newDiv.classList.add("list");
    console.log(weekId);
        if (weekId) {
            if (weekElement) {
                if (weekElement.style.backgroundColor === "rgb(250, 172, 96)") {
                    weekElement.style.backgroundColor = null;
                    weekElement.style.color = null;
                    var existingDiv = document.getElementById(weekId + "-" + h1TextContent);
                    if (existingDiv) {
                        existingDiv.remove();

                        const dateAndTime =  new Date();
                        var formattedDateTime = dateAndTime.toLocaleString();
                        document.querySelector('.toast-time').textContent = formattedDateTime;
                        const toastText = document.querySelector('.toast-content');
                        toastText.textContent = "Removed " + h1TextContent + " from the weekmenu.";
                        sendToast()
                        document.querySelector('.toast').classList.remove('hidden');
                        setTimeout(function(){
                            document.querySelector('.toast').classList.add('hidden');
                        }, 5000);

                    }
                   
                    var weekArr = ['mon'+hiddenKeyId, 'tue'+hiddenKeyId, 'wed'+hiddenKeyId, 'thu'+hiddenKeyId,'fri'+hiddenKeyId, 'sat'+hiddenKeyId, 'sun'+hiddenKeyId];
                    for(var i = 0; i < weekArr.length; i++) {
                        var dayElement = document.getElementById(weekArr[i]);
                        if (dayElement.style.backgroundColor === "rgb(250, 172, 96)" || dayElement.style.backgroundColor === "#FAAC60"){
                            weekParent.style.display = "flex";
                            break;
                        }else{
                            weekParent.style.display = null;
                        }  
                    }
                } else {
                    weekElement.style.backgroundColor = "#FAAC60";
                    weekElement.style.color = "white";
                    weekParent.style.display = "flex";
                    if (closestH1) {
     
                        
                        let parentDiv = document.getElementById(weekId.substring(0, 3) + "-day");
                        newDiv.innerHTML = h1TextContent;
                        parentDiv.appendChild(newDiv);


                        const dateAndTime =  new Date();
                        var formattedDateTime = dateAndTime.toLocaleString();
                        document.querySelector('.toast-time').textContent = formattedDateTime;
                        const toastText = document.querySelector('.toast-content');
                        toastText.textContent = "Added " + h1TextContent + " in the weekmenu.";
                        sendToast()
                        document.querySelector('.toast').classList.remove('hidden');
                        setTimeout(function(){
                            document.querySelector('.toast').classList.add('hidden');
                        }, 5000);

        
                    }



                }
    
            }
        }
    
    });
    });


    openRecipe();
});


});