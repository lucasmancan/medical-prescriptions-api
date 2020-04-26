
const express = require('express');
const router = express.Router();

const route = router.get('/', index);

function index(request, response){
    response.status(200).send({
            title: "Prescription System Api is running...",
            company:"Medtech",
            authors:[
                "Lucas F. Mançan"
                ,"Mikhael Belkovsky"],
            version: "0.0.1"
    });
}

module.exports = router;