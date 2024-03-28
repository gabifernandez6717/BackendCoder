const express = require('express')
const {Router} = express
const realTimeProducts = Router()
// http://localhost:8080/realTimeProducts?name=Gabi
realTimeProducts.get('/', async (req, res) => {
    const name = req.query.name
        res.render(
            'realTimeProducts',
            {
                name: name
            }
            )
        })

module.exports = realTimeProducts

