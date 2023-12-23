function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

function subtip(){
var tip = document.getElementById("tranzactie_tip").value;
 
  var list = new Array();
  
  if(tip === ""){
    list = ["" , ""];
  }
  
  if(tip == "Salariu"){
      list = ["" , "Salariu"];
  }
  
  if(tip == "Alte surse venit"){
      list = ["" , "Alocatie" , "Indemnizatie" , "Pensie" , "Ajutor Social" , "Castig" , "Altele"]
  }

  if(tip == "Casa"){
    list = ["" ,"Alimente/Curatenie", "Curent", "Gaz" , "Apa" , "Cheltuieli bloc" , "TV" , "Telefon" , "Subscriptii" , "Renovari/Modificari" , "Altele"];
  }

  if(tip == "Masina"){
    list = ["" , "Asigurare" , "ITP" , "ROvigneta" , "Carburant" , "Schimburi/Reparatii" , "Altele"];
  }

  if(tip == "Banca"){
    list = ["" , "Rate" , "Carduri" , "Transferuri" , "Altele"];
  }
  
    if(tip == "Sanatate"){
    list = ["" , "Medicamente" , "Consultatii"];
  }
  
      if(tip == "Educatie"){
    list = ["" , "Copii" , "Parinti"];
  }

  if(tip =="Alte cheltuieli"){
    list = ["" , "Imbracaminte" , "alte cheltuieli"];
  }

  var populate = document.querySelector("#tranzactie_subtip");
  Array.from(populate).forEach((option) => {
    populate.removeChild(option)
  })

  list.map((optionData) => {
    var opt = document.createElement('option')
    opt.appendChild(document.createTextNode(optionData));
    opt.value = optionData
    populate.appendChild(opt);
  })
}

//--------Butonul de "X" de inchis pop-up----------
function popupClose() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    
}

/*Make table colors*/
document.addEventListener("DOMContentLoaded", function() {
  var allTableCells = document.getElementsByTagName("div");

  for (var i = 0, max = allTableCells.length; i < max; i++) {
      var node = allTableCells[i];
      var currentVal = parseFloat(node.textContent);

      if (!isNaN(currentVal) && currentVal < 0) {
          var closestDivWithClass = findClosestDivWithClass(node, 'table-row'); // Replace 'yourClass' with the desired class
          
          if (closestDivWithClass) {
              closestDivWithClass.style.backgroundColor = "rgba(250, 173, 173, 0.6)";
          }
      }
  }
});

function findClosestDivWithClass(element, className) {
  while (element && element !== document) {
      if (element.tagName === 'DIV' && element.classList.contains(className)) {
          return element;
      }
      element = element.parentNode;
  }
  return null;
}


/*edit table cells*/

function editCell(cell, id) {
    var input = document.createElement('input');
    input.value = cell.innerText;

    // Assuming the column name is stored in a data attribute called "data-column"
    var columnName = cell.getAttribute('data-column');
    
    cell.innerHTML = '';
    cell.appendChild(input);

    input.focus();
    input.select();

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveCellEdit(cell, input, id, columnName);
        }
    });

    input.addEventListener('blur', function () {
        saveCellEdit(cell, input, id, columnName);
    });
}

function saveCellEdit(cell, input, id, columnName) {
    var newValue = input.value;

    // Send the updated data to the server using AJAX or a form submission
    // For simplicity, we are using a form submission in this example
    var form = new FormData();
    form.append('id', id);
    form.append('column_name', columnName);
    form.append('new_value', newValue);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/budget/update.php', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Update the cell content if the server request is successful
            cell.innerHTML = newValue;
        }
    };

    xhr.send(form);
}

//DELETE RECORD FROM TABLE

function deleteRecord(id) {
    // Send an AJAX request to the server to delete the record with the given ID
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/budget/delete.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Handle the response if needed
                console.log(xhr.responseText);

                // Reload the page after successful deletion
                if (xhr.responseText.trim() === 'Record deleted successfully') {
                    location.reload(true);
                }
            } else {
                // Handle error or display a message to the user
                console.error('Error deleting record');
            }
        }
    };
    xhr.send('id=' + id);
}
 