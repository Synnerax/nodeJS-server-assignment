
async function getProducts() {
  try {

    const response = await fetch ( 'http://localhost:8000/api/products/', { method: 'GET' });
    const data = await response.json();
    displayProduct(data);
    updateCart();
    return data;

  } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

  }
}

// visar upp produkterna på sidan
async function displayProduct(products) {
    const productContainer = document.querySelector('.store-items');

  productContainer.innerHTML = '';
  

  for (product of products) {
    const { image, Name, Price, id } = product;
    // skapar en sektion för produkten
    const container = document.createElement('section');
    container.setAttribute('class','product-container');

    // skapar en img tag med src till databse bilden 
    const pImg = document.createElement('img');
    pImg.setAttribute('src', image);

    // skapar namn för produkt
    const pName = document.createElement('h3');
    const name = document.createTextNode(Name);
    pName.appendChild(name);

    // skapar en p tag med pris
    const pPrice = document.createElement('p')
    const price = document.createTextNode(`Price: ${Price}`);
    pPrice.appendChild(price);
    
    // skapar en knapp
    const pButton = document.createElement('button');
    pButton.addEventListener('click', () => {
        addToCart(id);
    })
    pButton.setAttribute('class', 'add-item');
    pButton.setAttribute('value', id)
    const button = document.createTextNode('Lägg till i varukorg')

    pButton.appendChild(button);
    container.appendChild(pImg,);
    container.appendChild(pName);
    container.appendChild(pPrice);
    container.appendChild(pButton);

    productContainer.appendChild(container)
   
    }
    
     
}
// lägger till produkt i varukorg 
async function addToCart(checkProduct){
    let id = parseInt(checkProduct);

    const response = await fetch ( `http://localhost:8000/api/products/${id}`, { method: 'POST' });
        const data = await response.json();
        console.log(id);
        console.log(data);
        updateCart();
        return data;

};

// visar hur många produkter som ligger i varukorgen 
async function updateCart(){

    const url = 'http://localhost:8000/api/products/cart';
    const response = await fetch ( url, { method: 'GET' });
    const data = await response.json();
    let numberOfProd = document.getElementById('number');
    let parsenumber = parseInt(data.length);
    numberOfProd.innerText = parsenumber;

    console.log(data.length);
   return number
    
   }


getProducts();

