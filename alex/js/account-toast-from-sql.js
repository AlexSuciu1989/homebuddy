
document.addEventListener('DOMContentLoaded', function(){
    fetch('./php/toast-from-sql.php')
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        console.log(data.length-1);

        for(var i = 0; i < data.length; i++){

           let toastElement = document.createElement('div');
           toastElement.classList.add('toast-element');

            let toastElementHeader = document.createElement('div')
            toastElementHeader.classList.add('toast-element-header');
            toastElementHeader.textContent = data[i].member +" at "+data[i].nowdatetime;

            let toastElementBody = document.createElement('div')
            toastElementBody.classList.add('toast-element-body');
            toastElementBody.textContent = data[i].toast;


           let toastContainer = document.querySelector('.toast-board');

           toastContainer.appendChild(toastElement);
           toastElement.append(toastElementHeader, toastElementBody);
        }

    })
})