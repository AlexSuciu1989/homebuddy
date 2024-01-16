document.addEventListener('DOMContentLoaded', function(){
    fetch('./php/toast-from-sql.php')
    .then(response => response.json())
    .then(data =>{
        //console.log(data);
        //console.log(data.length-1);

        data.forEach(item =>{
            let toastElement = document.createElement('div');
            toastElement.classList.add('toast-element');
 
             let toastElementHeader = document.createElement('div')
             toastElementHeader.classList.add('toast-element-header');
             toastElementHeader.textContent = item.member +" at "+item.nowdatetime;
 
             let toastElementBody = document.createElement('div')
             toastElementBody.classList.add('toast-element-body');
             toastElementBody.textContent = item.toast;
 
 
            let toastContainer = document.querySelector('.toast-board');
 
            toastContainer.appendChild(toastElement);
            toastElement.append(toastElementHeader, toastElementBody);
        });
    });
});