const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const database = low(adapter)
const app = express();
const port = process.env.PORT || 8000;

const initialitingDB = require('./Initiating');
const checkCart = require('./Handler/checkcart')

// visa alla föremål
app.get("/api/products", async (request, response) => {
    const products = await database.get('Products').value();
    let msg = {
        // Default meddelande
        Succes: true,
        Status: 200,
        Message: "Displaying Database"
    }

    console.log(msg);
    response.send(products);
});



// Jag vill kunna lägga till produkter i en varukorg (KLAR)
app.post("/api/products/:add", async (request, response) => {
    const productId = await request.params.add;
    console.log(productId);
    const checkExistingItems = await checkCart.checkCartItem(productId);
    const product = await database.get('Products').find({id: productId}).value();
    let msg = {
        // Default meddelande
        Succes: false,
        Status: 200,
        Message: "Product not found!"
    }

    if (checkExistingItems == true) {
        msg.Message = "product already added to cart!"
        response.send(msg);

        
    } else if (product != null) {
        msg.Succes = true ;
        msg.Status = 200;
        msg.Message = "product added to cart!";
        await database.get("Shopingcart").push(product).write();

        response.send(msg);

       
    } else 

    response.send(msg);
    console.log(msg);
});

// Jag vill kunna ta bort produkter från min varukorg (KLAR)
app.delete("/api/products/:remove", async (request, response) => {
    const productId = await request.params.remove;
    const checkExistingItems = await checkCart.checkCartItem(productId);
    let msg = {
        // Default meddelande
        Succes: false,
        Status: 200,
        Message: "Unable to remove, not found in cart!"
    }

   
    if (checkExistingItems == true) {
        msg.Succes = true ;
        msg.Status = 200;
        msg.Message = "Product removed from your cart!";
        await database.get('Shopingcart').remove({id: productId}).write();

        console.log(msg)
        response.send(msg);
        return
    }

    console.log(msg)
    response.send(msg);
})

// Jag vill kunna se min varukorg och allt i den (KLAR)
app.get("/api/products/cart", async (request, response) => {
    const cart = await database.get("Shopingcart").value();
    let msg = {
        Succes: true,
        Status: 200,
        Message: "Cart loaded"
    };

    console.log(msg);
    response.send(cart);
})




app.listen(port, () => {
    console.log("Listening on Port:", port);
    initialitingDB.checkForDatabase;
    initialitingDB.checkForCart;
});

