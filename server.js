const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const database = low(adapter)
const app = express();
const port = process.env.PORT || 8000;


app.use(express.static('public'));
const initialitingDB = require('./Initiating');





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



// lägg till produkt i varukorgen 
app.post("/api/products/:add", async (request, response) => {
    const productId = await request.params.add;
    console.log(productId);
    const checkExistingItems = await checkCartItem(productId, database);
    const product = await database.get('Products').find({id: productId}).value();
    let msg = {
        // Default meddelande
        Succes: false,
        Status: 200,
        Message: "Product not found!"
    }
    if (checkExistingItems == true) {
        msg.Message = "product already added to cart!"
        console.log(msg);
        response.send(msg);   
    } else if (product != null) {
        msg.Succes = true ;
        msg.Status = 200;
        msg.Message = "product added to cart!";
        await database.get("Shopingcart").push(product).write();
        console.log(msg);
        response.send(msg); 
        
    } else {
    console.log(msg);
    response.send(msg);
}
});


// ta bort produkt från varukorgen 
app.delete("/api/products/:remove", async (request, response) => {
    const productId = await request.params.remove;
    const checkExistingItems = await checkCartItem(productId);
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

// se varukorg och allt i den
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


// kollar om produkten finns i varukorgen
const checkCartItem = (productId) => {
    let checkExistingItems = false;
    const product =  database.get("Shopingcart").find({id: productId}).value();

    if (product != null) {
        checkExistingItems = true;
        return checkExistingItems
    }

    return checkExistingItems
}


app.listen(port, () => {
    console.log("Listening on Port:", port);
    initialitingDB.checkForDatabase;
    initialitingDB.checkForCart;
});

