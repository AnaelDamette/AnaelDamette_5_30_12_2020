let btnAdd = document.querySelector('.plusMeuble');
let btnSubtrack = document.querySelector('.moinsMeuble');
let quantity = document.querySelector('.quantity');

btnAdd.addEventListener('click', () =>{
    quantity.value = parseInt(quantity.value)+1;
});

btnSubtrack.addEventListener('click', () =>{
    quantity.value = parseInt(quantity.value)-1;
});

function addtract() {

};
