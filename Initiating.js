const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const database = low(adapter)


const checkForDatabase = () => {
    const databaseInitiated = database.has("Products").value();
    if (!databaseInitiated) {
        console.log('No database found, creating new')
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
        console.log('Database created')
    }
    return
}

const checkForCart = () => {
    const shopingcartInitiated = database.has("Shopingcart").value();

    if (!shopingcartInitiated) {
        database.defaults({ Shopingcart: [] }).write();
    }
    return
}

exports.checkforDatabase = checkForDatabase();;
exports.checkforCart = checkForCart();