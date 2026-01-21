/* PARA DESPLIEGUE EN VERCEL */
const apiKey = process.env.API_KEY;

export default async function handle(req, res){
    try{

        let parts = req.query.endpoint;

        if(!Array.isArray(parts)){
            parts = [parts];
        }

        const endpoint = parts.join("/");
        const apiUrl = `https://api.football-data.org/v4/${endpoint}`;

        const response = await fetch(apiUrl, {
            headers:{
                "X-Auth-Token": apiKey
            }
        });

        const data = await response.json();
        res.status(200).json(data);

    }catch(error){
        console.error("Error: ", error);
        res.status(500).json({ error: "Error fetching data"});
    }
}