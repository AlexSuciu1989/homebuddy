async function sendToast() {

    const userName = "Suciu";
    const familyMember = document.querySelector('.toast-user').textContent;
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



document.addEventListener('DOMContentLoaded', function () {
    const uploadWeekmenu = document.querySelector('.submit-weekmenu');

    uploadWeekmenu.addEventListener('click', async function () {





        const elementsToDelete = document.querySelectorAll('.weekmenu-item-delete');

        elementsToDelete.forEach(function(element) {
            element.remove();
        });


        const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const weekNo = document.querySelector('.weekno').textContent.trim();
        const menuData = new FormData();
        menuData.append('weekno', weekNo);

        for (let i = 0; i < weekdays.length; i++) {
            const weekMenuParent = document.getElementById(weekdays[i] + '-day');
            const weekMenu = weekMenuParent.querySelectorAll('div');
            const weekMenuArray = Array.from(weekMenu);
            const contentArray = weekMenuArray.map(childDiv => childDiv.textContent.trim());

            // Append each day's contentArray to the FormData
            menuData.append(weekdays[i], contentArray.join(','));
        }

        try {
            const url = './php/food-buddy-weekmenu-to-sql.php';

            const response = await fetch(url, {
                method: 'POST',
                body: menuData,
            });

            if (response.ok) {
                console.log(await response.text());
                //location.reload();

                const dateAndTime =  new Date();
                var formattedDateTime = dateAndTime.toLocaleString();
                document.querySelector('.toast-time').textContent = formattedDateTime;
                const toastText = document.querySelector('.toast-content');
                toastText.textContent = "Saved the Week Menu for " + document.querySelector('.weekno').textContent + ".";
                sendToast();
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
    });
});
