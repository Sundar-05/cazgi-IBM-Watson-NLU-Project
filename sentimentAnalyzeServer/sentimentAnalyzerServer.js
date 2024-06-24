const express = require('express');
const app = new express();

/* This tells the server to use the client folder for all static resources */
app.use(express.static('client'));

/* This tells the server to allow cross origin references */
const cors_app = require('cors');
app.use(cors_app());

/* Uncomment the following lines to load the environment variables that you set up in the .env file */
const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

function getNLUInstance() {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

// The default endpoint for the webserver
app.get("/", (req, res) => {
    res.render('index.html');
});

// The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req, res) => {
    let urlToAnalyze = req.query.url;
    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Retrieve the emotion and return it as a formatted string
            return res.json(analysisResults.result.keywords[0].emotion);
        })
        .catch(err => {
            return res.status(500).json({ error: "Could not do desired operation", details: err.toString() });
        });
});

// The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req, res) => {
    let urlToAnalyze = req.query.url;
    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Retrieve the sentiment and return it as a formatted string
            return res.json(analysisResults.result.keywords[0].sentiment);
        })
        .catch(err => {
            return res.status(500).json({ error: "Could not do desired operation", details: err.toString() });
        });
});

// The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req, res) => {
    let textToAnalyze = req.query.text;
    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Retrieve the emotion and return it as a formatted string
            return res.json(analysisResults.result.keywords[0].emotion);
        })
        .catch(err => {
            return res.status(500).json({ error: "Could not do desired operation", details: err.toString() });
        });
});

app.get("/text/sentiment", (req, res) => {
    let textToAnalyze = req.query.text;
    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Retrieve the sentiment and return it as a formatted string
            return res.json(analysisResults.result.keywords[0].sentiment);
        })
        .catch(err => {
            return res.status(500).json({ error: "Could not do desired operation", details: err.toString() });
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port);
});
