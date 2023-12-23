function addNewEvent() {
    const containerTimeline = document.querySelector('.timeline');
    let containerDot;

    containerTimeline.addEventListener('mousemove', function(event) {
        const targetElement = event.target;

        // Check if the mouse is over the specific container
        if (targetElement.classList.contains('timeline')) {
            // Check if the containerDot exists; if not, create it
            if (!containerDot) {
                containerDot = document.createElement('div');
                containerDot.classList.add('content-dot');
                containerTimeline.appendChild(containerDot);
            }

            const y = event.clientY + window.scrollY;
            const x = event.clientX + window.scrollX;

            // Update the position of the containerDot
            containerDot.style.top = y + 'px';
            containerDot.style.left = x + 'px';
        } else {
            // If not over the specific container, remove the containerDot
            if (containerDot) {
                containerDot.remove();
                containerDot = null;
            }
        }
    });
}


document.addEventListener('DOMContentLoaded',function(){

    addNewEvent();
});