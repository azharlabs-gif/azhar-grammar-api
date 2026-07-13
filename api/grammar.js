export default async function handler(req, res) {

    // CORS allow
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Only POST method allowed"
        });
    }


    try {

        const { text } = req.body;


        if (!text) {
            return res.status(400).json({
                error: "Text is required"
            });
        }


        const response = await fetch(
            "https://api.languagetool.org/v2/check",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: new URLSearchParams({
                    text: text,
                    language: "en-US"
                })
            }
        );


        const data = await response.json();


        return res.status(200).json(data);


    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}
