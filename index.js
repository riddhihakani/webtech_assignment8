const express = require('express'); 
const axios = require('axios');
const https = require('https');
const cors = require('cors');
const app = express();              
const port = 5000;  



app.use(cors());

const ticketmaster_api = 'T5ZcSankhfeAEcEuAk0S2S47mhQQGURD';
const ip_key = "a53d3fcfb40158";
const geo_key = "AIzaSyDWYRk1Fqf93fBHW0pQ7RmOtKjTQOa4sT4";

app.get('/', (req, res) => {        
    res.sendFile('index.html', {root: __dirname});      
                                                        
});


// app.get('/search', (req, res) => {

// })

app.get("/search", async (req,res)=>{
    console.log(req.query)
    const events = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json?', {
      headers: {
        Authorization: `Bearer ${ticketmaster_api}`
      },
      params: req.query
    })

    res.json(events)
})

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});