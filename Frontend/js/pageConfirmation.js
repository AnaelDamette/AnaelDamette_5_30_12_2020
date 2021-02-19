
export {afficherCommandeComplete};

// afficher la commande finis dans commandeComplete.html
function afficherCommandeComplete() {
    let tableauItems = JSON.parse(sessionStorage.getItem('tableauItem'));
    let prixTotal = JSON.parse(sessionStorage.getItem('prixTotal'));
    let orderId = JSON.parse(sessionStorage.getItem('orderId'));
    let contact = JSON.parse(sessionStorage.getItem('contact'));

    tableauItems.forEach((cartItems) => {
        let prixTotalArticle = parseFloat(cartItems.price).toFixed(2) * parseFloat(cartItems.quantity).toFixed(2);
        console.log(cartItems, 'ici')
        let ligneArticle = document.createElement('tr');
        document.querySelector('.panierComplete').appendChild(ligneArticle);
        ligneArticle.innerHTML = ' <th>' + cartItems.name + ' ' + cartItems.selectVarnish + '</th>' +
            '<th>' + cartItems.quantity + '</th>' +
            '<th>' + cartItems.price + '</th>' +
            '<th>' + prixTotalArticle.toFixed(2) + '</th>'
    });
    let afficherPrixTotal = document.querySelector('.prixTotalConfirmation');
    afficherPrixTotal.textContent = prixTotal;
    let afficherMessageConfirmation = document.querySelector('.messageConfirmation');
    afficherMessageConfirmation.innerHTML = 'Merci, ' + contact.firstName + ', ' + contact.lastName + ',<br>pour la commande N°: ' + orderId +
        '<br>elle sera bien Livrée au ' + contact.address + ' ' + contact.city +
        '<br>Vous recevrez un mail de confirmation à : ' + contact.email;
    sessionStorage.clear();
    localStorage.clear();
};