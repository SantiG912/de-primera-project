import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;

const app = express();
app.use(cors({
    origin: "*",
}));

//Para limitar peticiones y evitar el límite de la API
const cache = new Map();
const getTTL = (endpoint) => {
  if (endpoint === "competitions") {
    return 24 * 60 * 60 * 1000;
  }
  if (endpoint.includes("standings")) {
    return 5 * 60 * 1000;
  }
  if (endpoint.includes("scorers")) {
    return 10 * 60 * 1000;
  }
  if (endpoint.includes("matches")) {
    return 60 * 1000;
  }
  return 60 * 1000;
};


app.get("/api/:endpoint*", async (req, res) => {

    const endpoint = req.params.endpoint + (req.params[0] || "");
    const key = req.originalUrl;
    const now = Date.now();
    const ttl = getTTL(endpoint);

    if(cache.has(key)){
        const {data, timestamp} = cache.get(key);
        if(now - timestamp < ttl){
            return res.json(data);
        }

        cache.delete(key);
    }

    try{
        const apiUrl = `https://api.football-data.org/v4/${endpoint}`;

        const response = await fetch(apiUrl,{
            headers:{
                "X-Auth-Token": apiKey,
            }
        });
        const data = await response.json();
        
        cache.set(key, {
            data,
            timestamp: now,
        });

        res.json(data);

    }catch(error){
        console.error("Error fetching data: ", error);
        res.status(500).json({ error: "Error fetching data" });
        
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on: ${PORT}`); 
});