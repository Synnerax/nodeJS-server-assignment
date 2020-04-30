// visar produkter från varukorgen
async function getCart() {
    try {
  
      const response = await fetch ( 'http://localhost:8000/api/products/cart', { method: 'GET' });
      const data = await response.json();
      displayCart(data);
      return data;
  
    } catch (error) {
      alert('Unfortunatly occured an error please reload the page', error);
  
    }
  }
  getCart();
  
  // Diplay the products on the web page
  async function displayCart(products) {
    const productContainer = document.querySelector('.store-items');

    productContainer.innerHTML = '';
    
  
    for (product of products) {
    const { image, Name, Price, id } = product;
      // skapar en sektion tag 
    const container = document.createElement('section');
    container.setAttribute('class','product-container');
      // skapar en img tag med src till databse bilden 
    const pImg = document.createElement('img');
    pImg.setAttribute('src', image);

      // skapar namn för produkt
    const pName = document.createElement('h3');
    const name = document.createTextNode(Name);
    pName.appendChild(name);

    const pPrice = document.createElement('p')
    const price = document.createTextNode(`Price: ${Price}`);
    pPrice.appendChild(price);
    
      // skapar en knapp
    const pButton = document.createElement('button');
    const button = document.createTextNode('Ta Bort')
    pButton.addEventListener('click', () => {
        removeFromCart(id);
        container.remove();
    })
    pButton.setAttribute('class', 'remove-item');

      pButton.appendChild(button);
      
      container.appendChild(pImg,);
      container.appendChild(pName);
      container.appendChild(pPrice);
      container.appendChild(pButton);
  
      productContainer.appendChild(container)

      }
       
  }


  // tar bort en produkt efter du trycker på ta bort knappen
async function removeFromCart(checkProduct){
    let id = parseInt(checkProduct);

    const response = await fetch ( `http://localhost:8000/api/products/${id}`, { method: 'DELETE' });
        const data = await response.json();
        console.log(id);
        console.log(data);
        updateCart(data);
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
   updateCart();