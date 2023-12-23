function popup_menu() {
    var popup = document.getElementById("myPopup-menu");
    popup.classList.toggle("show");
  }

  function popup_recipe() {
    var popup2 = document.getElementById("myPopup-recipe");
    popup2.classList.toggle("show");
  }

  function popupClose() {
    var popup = document.getElementById("myPopup-menu");
    popup.classList.toggle("show");
    
}

document.addEventListener("DOMContentLoaded", function () {

    // Function to update order
    function updateOrder(day) {
        var dayArray = Array.from(document.getElementById(day).children).map(item => item.textContent.trim());
        document.getElementById(day + "_hidden").value = JSON.stringify(dayArray);
    }

    // Function to set up MutationObserver for a day
    function setupObserver(day) {
        var dayElement = document.getElementById(day);

        if (dayElement) {
            var observer = new MutationObserver(function () {
                updateOrder(day);
            });

            // Configure the observer to watch for changes in the childList (i.e., when nodes are added or removed)
            var observerConfig = { childList: true };

            // Start observing the target node for configured mutations
            observer.observe(dayElement, observerConfig);
        }
    }

    // Set up observers for each weekday
    var weekdays = ["luni", "marti", "miercuri", "joi", "vineri", "sambata", "duminica"];

    weekdays.forEach(function (day) {
        setupObserver(day);
    });
});

//Face din datele aduse de SQL array si le baga in weekdays

document.addEventListener('DOMContentLoaded', function () {
    var weekday = ['luni','marti','miercuri','joi','vineri','sambata','duminica'];
    var i = 0;

    while(i < 7) {
        var day = document.getElementById(weekday[i]+'2').value;
        var itemsArray = JSON.parse(day);
        var containerElement = document.querySelector('#' + weekday[i]); // Use querySelector to select by class name

        itemsArray.forEach(function (itemText, index) {
            var newItem = document.createElement('div');
            newItem.textContent = itemText;
            newItem.className = "list1";
            newItem.draggable = true;
            newItem.setAttribute("data-index", index);
            newItem.ondragstart = function (event) {
                drag(event);
            };
            containerElement.appendChild(newItem);
        });

        i = i + 1;
    }
});



document.addEventListener('DOMContentLoaded', function () {
    var reteteArray = ['Mic Dejun','Pranz','Cina','Gustari'];
    var categorie_retete =['micdejun','pranz','cina','gustari'];
    var i = 0;

    while(i < 4) {
        var retete = document.getElementById(reteteArray[i]).value;
        var itemsArray = retete.split(",");
        var containerElement = document.querySelector('#' + categorie_retete[i]); // Use querySelector to select by class name

        itemsArray.forEach(function (itemText, index) {
            var newItem = document.createElement('div');
            newItem.textContent = itemText;
            newItem.className = "list1";
            newItem.draggable = true;
            newItem.setAttribute("data-index", index);
            newItem.setAttribute("data-item-name", itemText);
            newItem.ondragstart = function (event) {
                drag(event);
            };

            containerElement.appendChild(newItem);
        });

        i = i + 1;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Select all draggable lists
    let lists = document.querySelectorAll(".list1, .list1, .list1, .list1");

    // Select all drop zones
    let destinations = document.querySelectorAll("#luni, #marti, #miercuri, #joi, #vineri, #sambata, #duminica, #micdejun, #pranz, #cina, #gustari");

    // Add dragstart event listener to set data for the drag operation
    lists.forEach(function (list) {
        list.addEventListener("dragstart", function (e) {
            // Set the data for the drag operation as the class name of the dragged list
            e.dataTransfer.setData("text/plain", list.className);
        });
    });

    // Add dragover and drop event listeners to the drop zones
    destinations.forEach(function (destination) {
        destination.addEventListener("dragover", function (e) {
            // Prevent the default behavior to allow dropping
            e.preventDefault();
        });

        destination.addEventListener("drop", function (e) {
            // Prevent the default behavior to allow dropping
            e.preventDefault();

            // Get the data set in the dragstart event
            let data = e.dataTransfer.getData("text/plain");

            // Find the element with the specified class that is being dragged and is currently being hovered
            let draggedElement = document.querySelector("." + data + "[draggable=true]:hover");

            if (draggedElement) {
                // Check if the destination is one of the included containers
                if (["luni", "marti", "miercuri", "joi", "vineri", "sambata", "duminica"].some(included => destination.id.includes(included))) {
                    // If the destination is one of the included containers, copy the dragged element
                    let clonedElement = draggedElement.cloneNode(true);
                    destination.appendChild(clonedElement);
                } else {
                    // If the destination is not one of the included containers, move the dragged element
                    destination.appendChild(draggedElement);
                }
            }
        });

        // Add click event listener to delete items from destinations (except #micdejun, #pranz, #cina, #gustari)
        if (!["micdejun", "pranz", "cina", "gustari"].some(excluded => destination.id.includes(excluded))) {
            const excludedDays = ["luni", "marti", "miercuri", "joi", "vineri", "sambata", "duminica"];
            destination.addEventListener("click", function (e) {
                // Get the clicked element
                let clickedElement = e.target;

                // Check if the clicked element's ID is in the excluded list
                if (!excludedDays.includes(clickedElement.id)) {
                    // Remove the clicked element from its parent node
                    clickedElement.parentNode.removeChild(clickedElement);
                }
            });
        }
    });
});


