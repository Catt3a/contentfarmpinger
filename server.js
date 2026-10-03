const express = require('express');
const { json } = require('stream/consumers');
const app = express();
const PORT = process.env.PORT || 3000;
const delay = ms => new Promise(res => setTimeout(res, ms));

app.use(express.static('public'));
app.use(express.json());
app.set('trust proxy', 1);

app.get('/v1/health', async (req, res) => {
    return res.json({ success: true, message: "ok" })
});

async function pinger() {
    while (true) {
        await delay(35000);
        await fetch("https://eval.work.gd/v1/health");
    }
}

pinger();

app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
