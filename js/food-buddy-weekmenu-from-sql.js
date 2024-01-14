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

function getDateIntervalFromWeekNo (year, weekNumber){
    const januaryFirst = new Date (year, 0, 1);
    const daysOffset = (januaryFirst.getDay() + 6) % 7;

    const startDate = new Date(year, 0, 1 + (weekNumber)* 7 - daysOffset);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    return {
        start: startDate.toISOString(). split("T")[0],
        end: endDate.toISOString().split('T')[0]
    };

}


function clearContainers(){
    let menuContainers = document.querySelectorAll('.list-container');

    menuContainers.forEach(menuContainer => {
        while (menuContainer.firstChild) {
            menuContainer.removeChild(menuContainer.firstChild);
        }
});
};



function deleteItem(){

    var weekmenus = document.querySelectorAll('.list');
    var cards = document.querySelectorAll('.d-none');
    var checkedCard = "";
    cards.forEach(function(card){
        card.addEventListener('click', function(){
            const cardArray = ['s1', 's2', 's3', 's4', 's5', 's6','s7'];
            for(let i = 0; i<cardArray.length; i++){
                if(document.querySelector('#' + cardArray[i]).checked === true){
                    checkedCard = cardArray[i];

                }
            }
        })
    });

    weekmenus.forEach(function (weekmenu) {
        weekmenu.addEventListener('click', function (event) {
            let menuItem = event.target.id;
            let menuItemContainer = document.querySelector("#"+menuItem);
            let menuItemCard = menuItemContainer.parentElement.parentElement.parentElement.getAttribute('for');

            if(menuItemCard === checkedCard){

                const elementsToDelete = document.querySelectorAll("#"+menuItem+'.weekmenu-item-delete');

                elementsToDelete.forEach(function(element) {
                    element.remove();
                });
                
                const dateAndTime =  new Date();
                var formattedDateTime = dateAndTime.toLocaleString();
                document.querySelector('.toast-time').textContent = formattedDateTime;
                const toastText = document.querySelector('.toast-content');
                toastText.textContent = "Deleted " + document.querySelector("#"+menuItem).textContent+ " from " + document.querySelector("#"+"slide"+checkedCard[checkedCard.length -1]+" .weekday span").textContent + " in " + document.querySelector('.weekno').textContent;
                sendToast()
                document.querySelector('.toast').classList.remove('hidden');
                setTimeout(function(){
                    document.querySelector('.toast').classList.add('hidden');
                }, 5000);
                
                document.querySelector("#"+menuItem).remove();
                console.log('Deleting item:', menuItem);

            };
            
        });
    });
}


document.addEventListener('DOMContentLoaded', async function () {



    let today = new Date();
    let year = today.getFullYear();
    let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    let timeDifference = today - firstDayOfYear;
    let weekNumber = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
    const siteDateInterval = document.querySelector('.site-date-interval');
    document.querySelector('.weekno').innerHTML = "Week " + weekNumber;
    
    fetchAndDisplayWeeklyMenu();

    const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
    siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;

    if ( weekNumber === 1){
        document.querySelector('.arrow-left').style.display = 'none';
    } else if (weekNumber === 52){
        document.querySelector('.arrow-right').style.display = 'none';
    }

    let weekDecreaseIncrease = document.querySelectorAll('.arrow-left, .arrow-right');

    weekDecreaseIncrease.forEach(function (weekDecrIncr) {
        weekDecrIncr.addEventListener('click', async function () {
            if ((weekDecrIncr === document.querySelector('.arrow-left')) && (weekNumber > 1)) {
                weekNumber = weekNumber - 1;
                clearContainers();
                const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
                console.log (`Week ${weekNumber} of ${year} starts on ${dateInterval.start} and ends on ${dateInterval.end}`);
                siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;
                document.querySelector('.arrow-right').style.display = 'inline-block';
            }
            else if ((weekDecrIncr === document.querySelector('.arrow-right')) && (weekNumber < 52)) {
                weekNumber = weekNumber + 1;
                clearContainers();
                const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
                siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;
                
                document.querySelector('.arrow-left').style.display = 'inline-block';
            }

            else if((weekDecrIncr === document.querySelector('.arrow-left')) && (weekNumber < 2)){
                year = today.getFullYear() - 1;
                console.log(year);
                clearContainers();
                const dateInterval = getDateIntervalFromWeekNo(year, weekNumber);
                siteDateInterval.innerHTML = `${dateInterval.start} - ${dateInterval.end}`;
            }

            if ( weekNumber === 1){
                document.querySelector('.arrow-left').style.display = 'none';
            } else if (weekNumber === 52){
                document.querySelector('.arrow-right').style.display = 'none';
            }
        
            document.querySelector('.weekno').innerHTML = "Week " + weekNumber;
            


            fetchAndDisplayWeeklyMenu();
        });
    });
});


async function fetchAndDisplayWeeklyMenu() {
    function extractObjects(responseData, weekId) {
        return responseData.map(obj => obj[weekId]);
    }

     try {
        const weeknumber = document.querySelector('.weekno').innerHTML.trim();
        console.log(weeknumber);

        // First fetch request
        const response = await fetch('./php/food-buddy-weekmenu-from-sql.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                weeknumber: encodeURIComponent(weeknumber),
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);

            const weekId = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

            for (let i=0; i<weekId.length; i++){
            let  weekIdValue = weekId[i];
            const result = extractObjects(responseData, weekIdValue);
            const resultArr = result[0].split(',');
            console.log(resultArr);
            
            const deleteButton = document.createElement('span');
            deleteButton.textContent = '  delete';
            deleteButton.className = 'weekmenu-item-delete';
            //deletebutton.style.display = 'none';
            deleteButton.style.fontSize = '8px';
            

               let dayContainer = document.querySelector('#'+weekIdValue+'-day');
                for (let n = 0; n < resultArr.length; n++){
                const newItem = document.createElement('div');
                newItem.className = 'list';
                newItem.id = weekIdValue + "-" + n;
                newItem.textContent = resultArr[n];
                newItem.style.position ='relative';
                

                const deleteButton = document.createElement('span');
                deleteButton.textContent = '  click item to delete';
                deleteButton.className = 'weekmenu-item-delete';
                
                dayContainer.appendChild(newItem).appendChild(deleteButton);
    
                }
            }

        } else {
            console.error('Failed to submit data');
        }

    } catch (error) {
        console.error('Error:', error);
    }
    deleteItem();
}


