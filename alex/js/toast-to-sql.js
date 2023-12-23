export async function sendToast(event) {
        event.preventDefault();

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
    