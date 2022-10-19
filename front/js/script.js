const api = "http://localhost:3000/api/products";
let section = document.getElementById("items");
fetch(api)
  .then((res) => res.json())
  .then((DataKanap) => {
    for (let Kanap of DataKanap) {
      let a = document.createElement("a");
      a.href = "./product.html?id=" + Kanap._id;
      section.appendChild(a);
      let article = document.createElement("article");
      let img = document.createElement("img");
      img.src = Kanap.imageUrl;
      img.alt = Kanap.altTxt;
      let h3 = document.createElement("h3");
      h3.className = "productName";
      let h3text = document.createTextNode(Kanap.name);
      h3.appendChild(h3text);
      let p = document.createElement("p");
      let ptext = document.createTextNode(Kanap.description);
      p.className = "productDescription";
      p.appendChild(ptext);
      a.appendChild(article);
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);
    }
  });
