const express = require('express');
const { json } = require('stream/consumers');
const app = express();
const PORT = process.env.PORT || 3000;
const delay = ms => new Promise(res => setTimeout(res, ms));

app.use(express.static('public'));
app.use(express.json());
app.set('trust proxy', 1);

app.get('/api/ping', async (req, res) => {
    return res.json({ success: true, message: "A" });
});

async function pinger() {
    while (true) {
        await delay(600000);
        await fetch("https://contentfarm-of5v.onrender.com/api/ping");
    }
}

pinger();

app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
