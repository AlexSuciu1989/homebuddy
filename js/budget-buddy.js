function showCharts() {
    const subNavItems = document.querySelectorAll('.sub-navigation div');
    const timeline = document.querySelector('.timeline-nav');
    const charts = document.querySelector('.charts-nav');
    subNavItems.forEach(navItem => {
        navItem.addEventListener('click', function(event) {
            subNavItems.forEach(item => {
                item.classList.remove('active-nav');
            });

            event.target.classList.add('active-nav');

            if(event.target === charts ){
                document.querySelector('.budget-timeline').style.display = 'none'
            }else{
                document.querySelector('.budget-timeline').style.display = 'flex'
            }
        });
    });
}


function addNewCard() {
    const addButton = document.querySelector('.addnew-container');
    const timeline = document.querySelector('.timeline');

    addButton.addEventListener('click', function () {
        document.querySelector('.add-new-card').classList.add('visible');
        timeline.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    });
    const selectedMonth =  document.querySelector('.add-month').value;
    const saveButton = document.querySelector('.save-button');

    saveButton.addEventListener('click', function(){
        const inputObject = {
            year: new Date().getFullYear(),
            month: document.querySelector('.add-month').value,
            income: parseInt(document.querySelector('.new-income-amount').value),
            lawns: parseInt(document.querySelector('.new-lawns-amount').value),
            expenses: parseInt(document.querySelector('.new-expenses-amount').value),
            savings: parseInt(document.querySelector('.new-savings-amount').value),
            budget: null
        }
        
        Object.keys(inputObject).forEach(key => {
            if(isNaN(inputObject[key]) && key !== 'month'){
                inputObject[key] = 0;
            } else {
                inputObject[key] = inputObject[key];
            }
        } )
        inputObject.budget = inputObject.income - inputObject.lawns - inputObject.expenses - inputObject.savings;

        console.log('My Object is: ', inputObject);
    })
}





document.addEventListener('DOMContentLoaded', function(){
    addNewCard();
    showCharts()
})
