
const express = require('express');
const router = express.Router();

const route = router.get('/', index);

function index(request, response){
    response.status(200).send({
            title: "Node Api is running...",
            version: "0.0.1"
    });
}

module.exports = router;