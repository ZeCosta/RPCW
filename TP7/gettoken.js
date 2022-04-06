const axios = require('axios');

axios.post('http://clav-api.di.uminho.pt/v2/users/login',{
    "username": "pri2020@teste.uminho.pt",
    "password": "123"
})
    .then(resp => {
        console.log(resp.data);
    })
    .catch(error => {
        console.log(error);
    });