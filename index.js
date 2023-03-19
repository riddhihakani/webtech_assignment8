const express = require('express'); 
const axios = require('axios');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();              
const port = 5000;  



app.use(cors());

app.use(bodyParser.json());

const ticketmaster_key = "T5ZcSankhfeAEcEuAk0S2S47mhQQGURD";
const ip_key = "a53d3fcfb40158";
const geo_key = "AIzaSyDWYRk1Fqf93fBHW0pQ7RmOtKjTQOa4sT4";


app.use(express.static(__dirname + '/dist/wt'));
app.use('/search', express.static('/dist/wt'));

app.get('/search', (req, res) => {        
    res.sendFile(__dirname + '/dist/wt/index.html');      
                                                        
});


// app.get('/search', (req, res) => {

// })

app.get("/search/tm", async (req,res)=>{
    console.log("in node js file");
    console.log(req.query.keyword);
    console.log(req.query.category);
    console.log(req.query.location);
    console.log(req.query.distance);
    const headers = {
      Authorization: `Bearer ${ticketmaster_key}`,
      // 'Content-Type': 'application/json',
    };
    
    const param = {
      keyword: req.query.keyword
    }

    // console.log(params.keyword)
    //https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${ticketmaster_key}&keyword=${req.query.keyword}

    //const e = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`,{headers,params})
    const e = await axios({
      url: "https://app.ticketmaster.com/discovery/v2/events.json",
      // headers: {Authorization:`Bearer ${ticketmaster_key}`},
      params: {keyword: req.query.keyword, apikey: ticketmaster_key}
    })
    // res.json(events)
    console.log("events received successfully");
    console.log(e.data._embedded.events[0]);
})

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});