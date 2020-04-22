const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const database = low(adapter)


const checkCartItem = (productId) => {
    let checkExistingItems = false;
    const product =  database.get("Shopingcart").find({id: productId}).value();

    if (product != null) {
        checkExistingItems = true;
        return checkExistingItems
    }

    return checkExistingItems
}


exports.checkCartItem = checkCartItem;