const textInput = document.getElementById("textInput");
const output = document.getElementById("output");


async function checkGrammar() {

    const text = textInput.value.trim();


    if (text === "") {
        alert("Please enter some text first.");
        return;
    }


    output.innerHTML = "⏳ Checking grammar...";


    try {

        const response = await fetch(
            "https://azhar-grammar-api.vercel.app/api/grammar",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );


        const data = await response.json();


        if (data.matches && data.matches.length > 0) {

            let correctedText = text;


            data.matches.reverse().forEach(match => {

                const replacement = match.replacements[0]?.value;

                if (replacement) {

                    correctedText =
                    correctedText.substring(0, match.offset) +
                    replacement +
                    correctedText.substring(
                        match.offset + match.length
                    );

                }

            });


            output.innerText = correctedText;

        } else {

            output.innerText =
            "✅ No grammar mistakes found!\n\n" + text;

        }


    } catch(error) {

        output.innerText =
        "❌ Error connecting to Grammar API.";

        console.log(error);

    }

}



function copyText(){

    navigator.clipboard.writeText(
        output.innerText
    );

    alert("✅ Result copied!");

}
