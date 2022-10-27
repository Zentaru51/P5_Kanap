const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const api = "http://localhost:3000/api/products/" + id;
const div_img = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const button = document.getElementById("addToCart");
fetch(api)
  .then((res) => res.json())
  .then((Product) => {
    let img = document.createElement("img");
    img.src = Product.imageUrl;
    img.alt = Product.altTxt;
    div_img.appendChild(img);
    title.textContent = Product.name;
    price.textContent = Product.price;
    description.textContent = Product.description;
    for(let i = 0; i<Product.colors.length; i++){
      let option = document.createElement("option");
      option.setAttribute("value",Product.colors[i]);
      option.textContent = Product.colors[i];
      colors.appendChild(option);
    }
  });
  button.addEventListener("click",(e) => {
    const colors = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (colors == null || colors === '' || quantity == null || quantity>100 || quantity<=0 ) {
      alert("Veuillez mettre un nombre d'articles valides (Entre 1 et 100) et une couleur valide")
      return
    }
    let dataCart = JSON.parse(localStorage.getItem("Kanap"));
    if(dataCart===null){
      dataCart = [];
    }
    // console.log(dataCart);
    let identicalproduct = false;
    const dataSelected = {
      id :  id,
      colors : colors,
      quantity : parseInt(quantity),
    }
    for (let data of dataCart) {
      if (id==data.id && colors==data.colors) {
        identicalproduct = true;
        data.quantity += dataSelected.quantity;
        break
      }
    }
    if (identicalproduct == false) {
      dataCart.push(dataSelected);
    }
    localStorage.setItem("Kanap", JSON.stringify(dataCart));
    if (window.confirm("Votre produit a bien été ajouté au panier, voulez vous poursuivre vers le panier ?")) {
      window.location.href = "./cart.html";
    }
  })
