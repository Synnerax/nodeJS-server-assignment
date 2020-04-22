const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const database = low(adapter)
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("public"));



const checkForDatabase = () => {
    const databaseInitiated = database.has("Products").value();

    if (!databaseInitiated) {
        database.defaults({ Products: [
                {
                    "Name": "Rino Plastic",
                    "Price": "100",
                    "id": "01",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Liquid Dinosaur",
                    "Price": "100",
                    "id": "02",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Action Figure Kakadua",
                    "Price": "100",
                    "id": "03",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Giant Jurassic Stone",
                    "Price": "100",
                    "id": "04",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Charcaol",
                    "Price": "100",
                    "id": "05",
                    "image": "https://placeimg.com/640/480/any"
                }
        ] }).write();
    }
}

const checkForCart = () => {
    const shopingcartInitiated = database.has("Shopingcart").value();

    if (!shopingcartInitiated) {
        database.defaults({ Shopingcart: [] }).write();
    }
}



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
    const checkExistingItems = await checkCartItem(productId);
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
        console.log(msg);

        
    } else if (product != null) {
        msg.Succes = true ;
        msg.Status = 200;
        msg.Message = "product added to cart!";
        await database.get("Shopingcart").push(product).write();

        response.send(msg);
        console.log(msg);

       
    } else 

    response.send(msg);
    console.log(msg);
});

// Jag vill kunna ta bort produkter från min varukorg (KLAR)
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
        msg.Succes= true ;
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

// Jag vill bli påmind om produkten redan finns i min varukorg (KLAR)
const checkCartItem = async (productId) => {
    let checkExistingItems = false;
    const product = await database.get("Shopingcart").find({id: productId}).value();

    if (product != null) {
        checkExistingItems = true;
        return checkExistingItems
    }

    return checkExistingItems
}



app.listen(port, () => {
    console.log("Listening on Port:", port);
    checkForDatabase();
    checkForCart();
});