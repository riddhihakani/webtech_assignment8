const express = require('express'); 
const axios = require('axios');
const geohash = require('ngeohash');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();              
const port = 5000;  


'use strict';
app.use(cors());

app.use(bodyParser.json());

const ticketmaster_key = "T5ZcSankhfeAEcEuAk0S2S47mhQQGURD";
const ip_key = "a53d3fcfb40158";
const geo_key = "AIzaSyDWYRk1Fqf93fBHW0pQ7RmOtKjTQOa4sT4";


app.use(express.static(__dirname + '/dist/wt'));
app.use('/search', express.static('/dist/wt'));
app.use('/favorites', express.static('/dist/wt'));

app.get('/search', (req, res) => {        
    res.sendFile(__dirname + '/dist/wt/index.html');      
                                                        
});


// app.get('/search', (req, res) => {

// })

app.get("/search/tm", async (req,res)=>{
    console.log("in node js file");
    // console.log(req.query.keyword);
    console.log(req.query.category);
    // console.log(req.query.distance);
    console.log(req.query.lat);
    console.log(req.query.long);

    var g = geohash.encode(req.query.lat, req.query.long);
    console.log(g);
    //console.log(geohash.decode(g));
    // const headers = {
    //   Authorization: `Bearer ${ticketmaster_key}`,
      // 'Content-Type': 'application/json',
    //};
    
    // const param = {
    //   keyword: req.query.keyword
    // }

    // console.log(params.keyword)
    //https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${ticketmaster_key}&keyword=${req.query.keyword}

    //const e = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`,{headers,params})
    if(req.query.category=='Default'){
      const e = await axios({
        url: "https://app.ticketmaster.com/discovery/v2/events.json",
        // headers: {Authorization:`Bearer ${ticketmaster_key}`},
        params: {apikey: ticketmaster_key, keyword: req.query.keyword, radius: req.query.distance, unit: "miles", geoPoint: g}
      })

      console.log("events received successfully");
      console.log(e);
      // e = JSON.parse(e);
      // console.log(e);
      res.json(e.data);
    }else{
      const e = await axios({
      url: "https://app.ticketmaster.com/discovery/v2/events.json",
      // headers: {Authorization:`Bearer ${ticketmaster_key}`},
      params: {apikey: ticketmaster_key, keyword: req.query.keyword, segmentId: req.query.category, radius: req.query.distance, unit: "miles", geoPoint: g}
    })
    // res.json(events)
    console.log("events received successfully");
    console.log(e);
    //res.json(e);
    // e = JSON.parse(e);
    // console.log(e);
    res.json(e.data);
  }
    
})

app.get("/suggest", async (req, res) => {
  console.log(Req.query.keyword);
  const l = await axios({
    url: "https://app.ticketmaster.com/discovery/v2/suggest",
    // headers: {Authorization:`Bearer ${ticketmaster_key}`},
    params: {keyword: req.query.keyword, apikey: ticketmaster_key}

  })
  console.log(l);
})

app.get("/eventDetails", async (req, res) => {

  console.log(req.query.id);
  const d = await axios({
    url: "https://app.ticketmaster.com/discovery/v2/events",
    // headers: {Authorization:`Bearer ${ticketmaster_key}`},
    params: {id: req.query.id, apikey: ticketmaster_key}

  })
  console.log("in event details");
  console.log(d);
  res.json(d.data);
})

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});