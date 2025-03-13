/*document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let email = document.getElementById("email").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let message = document.querySelector("textarea").value.trim();
        if (firstName === "" || lastName === "" || email === "" || mobile === "" || message === "") {
            alert("tout les champs sont obligatoires");
            return;
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("email invalide");
            return;
        }
        let mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            alert("numere invalide. vous devez entrez 10 nombre");
            return;
        }
        alert("Formulaire validé avec succés!");
        form.reset();
    });
    
});
*/
// Select au formulaire en jquery :
$(document).ready(function(){
    $('#methode').change(function(){
        var selectedOption = $(this).val();
        if(selectedOption == ''){
            alert('Veuillez sélectionner une méthode de paiement.');
          
        }
    });
});

$(document).ready(function() {
    let form = $("form");

    form.on("submit", function(event) {
        event.preventDefault(); 
        let firstName = $("#firstName").val().trim();
        let lastName = $("#lastName").val().trim();
        let email = $("#email").val().trim();
        let mobile = $("#mobile").val().trim();
        let message = $("textarea").val().trim();
        
        if (firstName === "" || lastName === "" || email === "" || mobile === "" || message === "") {
            alert("Tous les champs sont obligatoires");
            return;
        }
        
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email invalide");
            return;
        }
        
        let mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            alert("Numéro invalide. Vous devez entrer 10 chiffres");
            return;
        }
        
        alert("Formulaire validé avec succès!");
        form[0].reset();
    });
});

