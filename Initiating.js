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
                    "id": "1",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Liquid Dinosaur",
                    "Price": "100",
                    "id": "2",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Action Figure Kakadua",
                    "Price": "100",
                    "id": "3",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Giant Jurassic Stone",
                    "Price": "100",
                    "id": "4",
                    "image": "https://placeimg.com/640/480/any"
                },
                {
                    "Name": "Charcaol",
                    "Price": "100",
                    "id": "5",
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