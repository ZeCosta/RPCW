const axios = require('axios');

axios.get('http://localhost:3000/pubs')
    .then(function (resp){
        pubs = resp.data;
        pubs.forEach(p => {
            //console.log(`${p.year}, ${p.id}, ${p.title}`);
            console.log(p.year+"::"+p.id+"::"+p.title);
        });
    })
    .catch(function (error){
        console.log(error);
    });

