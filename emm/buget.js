function V_total()
{
    var a = parseInt(document.getElementById("sal1").value);
    var b = parseInt(document.getElementById("sal2").value);
    var c = parseInt(document.getElementById("alte ven").value);
    var sum = 0;
    if (isNaN(a) && isNaN(b) && isNaN(c))
    {
        alert ("Te rog sa completezi minim un camp");
        return;
    }

    if (isNaN(a))
    {
      sum = (isNaN(b) ? 0 :b) + (isNaN(c) ? 0 : c);
    } else if (isNaN(b)) {
      sum = (isNaN(a) ? 0 : a) + (isNaN(c) ? 0 : c);
    } else if (isNaN(c)) {
      sum = (isNaN (a) ? 0 : a) + (isNaN(b) ? 0 : b);
    } else {
      sum = a + b + c;
    }
    
    document.getElementById("rezultat").value = sum;
  }

document.addEventListener("DOMContentLoaded", function daNuDropdownfunction() {
const daNuDropdown = document.getElementById("daNuDropdown");
const nextContent = document.getElementById("nextContent");

if (daNuDropdown && nextContent) {
  daNuDropdown.addEventListener ("change", () => {  
    const selected_value = daNuDropdown.value; //check the selected option value
      if (selected_value === "NU") {
        nextContent.style.display = "none";
        } else {
          nextContent.style.display = "block";
          }
    });
  }
})


document.addEventListener("DOMContentLoaded", function calcul_procent() {

  document.getElementById("suma_economisita").addEventListener ("click", function calcul_procent() {
  var procentSelectat = 0;
  if (document.getElementById("procent10").checked) {
    procentSelectat = 10;
  } else if ( document.getElementById ("procent20").checked) {
    procentSelectat = 20;
  }

  var ven_tot = parseInt(document.getElementById("rezultat").value);
  if (procentSelectat === 10 || procentSelectat === 20) {
    var rez_eco = ven_tot * (procentSelectat / 100);
  } else {
    return;
  }

  document.getElementById("rez_eco").value = rez_eco;
})
})

function InfoPopup() {
  var popup = document.getElementById("EmPopup");
  popup.classList.toggle("show");
}
 
