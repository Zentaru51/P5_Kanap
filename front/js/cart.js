const api = "http://localhost:3000/api/products/";
function getLocalStorage() {
  const data = localStorage.getItem("Kanap")
  if (data == null) {
    return [];
  } else {
    return JSON.parse(data);
  }
}
let dataCart = getLocalStorage();
const cartItem = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
for (let data of dataCart) {
  fetch(api + data.id)
    .then((res) => res.json())
    .then((Product) => {
      const html = `<article class="cart__item" data-id="${data.id}" data-color="${data.colors}">
        <div class="cart__item__img">
          <img src="${Product.imageUrl}" alt="${Product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${Product.name}</h2>
            <p>${data.colors}</p>
            <p>${Product.price},00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      cartItem.innerHTML += html;
    });
}

const calcTotal = () => {
  let totalQ = 0;
  let totalP = 0;
  for (let data of dataCart) {
    totalQ += data.quantity;
    fetch(api + data.id)
      .then((res) => res.json())
      .then((Product) => {
        totalP += Product.price * data.quantity;
        totalPrice.textContent = totalP + ",00";
      });
  }
  if(dataCart == ""){
    totalPrice.textContent = totalP + ",00";
  }
  totalQuantity.textContent = totalQ;
};
calcTotal();

const adjustQuantity = () => {
  for(let data of dataCart){
    fetch(api + data.id)
    .then((res) => res.json())
    .then(() => {
      document.querySelectorAll(".itemQuantity").forEach((element) => {
        element.addEventListener("change", () => {
          let article = element.closest("article");
          let id = article.getAttribute("data-id");
          let color = article.getAttribute("data-color");
          if (id == data.id && color == data.colors) {
            if (parseInt(element.value)>100 || parseInt(element.value)<=0) {
              alert("Veuillez mettre un nombre d'articles valides (Entre 1 et 100)");
            }
            else {
            data.quantity = parseInt(element.value);
            localStorage.setItem("Kanap", JSON.stringify(dataCart));
            alert("Votre produit a bien été modifié");
            calcTotal();
            }
          }
        })
      });
    })
  }
}
adjustQuantity();

const delItem = () => {
  for(let data of dataCart){
    fetch(api + data.id)
    .then((res) => res.json())
    .then(() => {
      document.querySelectorAll(".deleteItem").forEach((element) =>{
        element.addEventListener("click", () => {
          let article = element.closest("article");
          let id = article.getAttribute("data-id");
          let color = article.getAttribute("data-color");
          if (id == data.id && color == data.colors){
            if (window.confirm("Êtes vous sûr de vouloir supprimer ce produit ?")) {
              cartItem.removeChild(article);
              dataCart = dataCart.filter((Kanap) => Kanap.id != id || Kanap.colors != color);
              localStorage.setItem("Kanap", JSON.stringify(dataCart));
              calcTotal();
              PanierVide();
            }
          }
        })
      })
    })
  }
}
delItem();

let prenom = document.getElementById("firstName");
const regexName = /^[a-zA-Z]+[- ]*[a-zA-Z]+$/;
const checkFirstName = () => {
  if (prenom.value.trim() == "" || !prenom.value.match(regexName)) {
    prenom.style.border = "3px solid red";
    document.getElementById("firstNameErrorMsg").textContent = "Veuillez écrire un prénom valide";
    return false;
  } else {
    prenom.style.border = "3px solid green";
    document.getElementById("firstNameErrorMsg").textContent = "";
    return true;
  }
}
prenom.addEventListener("change", checkFirstName);

let nom = document.getElementById("lastName");
const checkLastName = () => {
  if (nom.value.trim() == "" || !nom.value.match(regexName)) {
    nom.style.border = "3px solid red";
    document.getElementById("lastNameErrorMsg").textContent = "Veuillez écrire un nom valide";
    return false;
  } else {
    nom.style.border = "3px solid green";
    document.getElementById("lastNameErrorMsg").textContent = "";
    return true;
  }
}
nom.addEventListener("change", checkLastName);

let address = document.getElementById("address");
const regexAddress = /^[0-9]+[ ][a-zA-Z]{2,}[ ][a-zA-Z]{2,}$/;
const checkAddress = () => {
  if (address.value.trim() == "" || !address.value.match(regexAddress)) {
    address.style.border = "3px solid red";
    document.getElementById("addressErrorMsg").textContent = "Veuillez écrire une adresse valide";
    return false;
  } else {
    address.style.border = "3px solid green";
    document.getElementById("addressErrorMsg").textContent = "";
    return true;
  }
}
address.addEventListener("change", checkAddress);

let city = document.getElementById("city");
const checkCity = () => {
  if (prenom.value.trim() == "" || !city.value.match(regexName)) {
    city.style.border = "3px solid red";
    document.getElementById("cityErrorMsg").textContent = "Veuillez écrire une ville valide";
    return false;
  } else {
    city.style.border = "3px solid green";
    document.getElementById("cityErrorMsg").textContent = "";
    return true;
  }
}
city.addEventListener("change", checkCity);

let email = document.getElementById("email");
// /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
// /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const checkEmail = () => {
  if (email.value.trim() == "" || !email.value.match(regexEmail)) {
    email.style.border = "3px solid red";
    document.getElementById("emailErrorMsg").textContent = "Veuillez écrire un email valide";
    return false;
  } else {
    email.style.border = "3px solid green";
    document.getElementById("emailErrorMsg").textContent = "";
    return true;
  }
}
email.addEventListener("change", checkEmail);

function PanierVide() {
  if (dataCart.length === 0) {
  document.querySelector(".cartAndFormContainer h1").textContent = "Votre panier est vide";
  document.getElementById("order").style.visibility = "hidden";
}
}
PanierVide();

document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();
    if (checkFirstName() == true && checkLastName() == true && checkAddress() == true && checkCity() == true && checkEmail() == true) {
    let contact = new Object();
    let products = [];
    contact.firstName = prenom.value;
    contact.lastName = nom.value;
    contact.address = address.value;
    contact.city = city.value;
    contact.email = email.value;
    for(let data of dataCart){
      products.push(data.id)
    }
    fetch("http://localhost:3000/api/products/order",{
      method : "POST",
      body : JSON.stringify({contact, products}),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      location.href = `confirmation.html?orderId=${data.orderId}`;
      localStorage.removeItem("Kanap");
    })
  }
})
