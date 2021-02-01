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



let cartItemstest = JSON.parse(localStorage.getItem("articleInCart"));

console.log(cartItemstest, Array.isArray(cartItemstest));
//delete cartItemstest['Coffee Table Light Oak'];
console.log(cartItemstest, typeof(cartItemstest));
//cartItemstest['Coffee Table Dark Oak'].quantity = 4;

localStorage.setItem('articleInCart', JSON.stringify(cartItemstest));