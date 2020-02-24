const express = require('express')
const assert = require('assert')
const {
    MongoClient,
    ObjectID
} = require('mongodb')
const app = express()
const bodyParser = require('body-parser')
const mongo_url = "mongodb://localhost:27017"
const dataBase = "first-api"

app.use(bodyParser.json())
MongoClient.connect(mongo_url, (err, client) => {
        assert.equal(err, null, 'data base connection failed')
        const db = client.db(dataBase)
        app.post('/newProduct', (req, res) => {
            let newProduct = req.body
            db.collection('products').insertOne(newProduct, (err, data) => {
                if (err) res.send("can't add product ")
                else res.send('product added')
            })
        })

        app.get('/getProduct', (req, res) => {
            db.collection('products').find().toArray((err, data) => {
                if (err) res.send("can't fetch product")
                else res.send(data)
            })
        })

        app.get('/product/:id', (req, res) => {
            db.collection('products').findOne({
                    _id: ObjectID(req.params.id)
                },
                (err, data) => {
                    if (err) res.send("can't fetch product")
                    else res.send(data)
                })
        })

        app.put('/modify-product/:id', (req, res) => {
            let idproduct = ObjectID(req.params.id)
            let modifyproduc = req.body
            db.collection('products').findOneAndUpdate({
                _id: idproduct
            }, {...modifyproduc }, (err, data) => {
                if (err) res.send("can't modify subject")
                else res.send('product modified')
            })
        })

    })
    // var tab = [{
    //     name: 'product',
    //     price: 20,
    //     availableQty: 10
    // }, {
    //     name: 'product2',
    //     price: 40,
    //     availableQty: 5
    // }, {
    //     name: 'product3',
    //     price: 30,
    //     availableQty: 5
    // }]

// app.get('/products', (req, res) => {
//     res.send(tab)
// })

// app.post('/addProduct', (req, res) => {
//     let newProduct = req.body
//     tab.push(newProduct)
//     res.send(tab)
//     console.log("new tab value", newProduct)
// })

// app.put('/ModifyProduct', (req, res) => {
//     let ModifyProduct = req.body
//     let tab1 = tab.map(e => e.name === ModifyProduct.name ? e = ModifyProduct : e)
//     res.send(tab1)
// })

// app.delete('/DeleteProduct/:name', (req, res) => {
//     let deleteProduct = req.params.name
//     tab = tab.filter(e => e.name === deleteProduct)
//     res.send(tab)

// })


app.listen(3000, (err) => {
    if (err) {
        console.log('server is not running')

    } else {
        console.log('server is running at 3000')
    }
})