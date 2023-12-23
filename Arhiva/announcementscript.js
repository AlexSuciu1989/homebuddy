function Intarzii() 
{
  document.getElementById("announcement1").innerHTML = document.getElementById("intarzii").value;
  fetch('anouncement.php')
    .then(response => response.text())
    .then(data => {
      // Handle the response from the PHP script
    });
}

function Cumparaturi() 
{
  document.getElementById("announcement1").innerHTML = document.getElementById("cumparaturi").value;
}