const express = require('express');
const ping = require('ping');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rota para verificar o status dos IPs
app.post('/verificar', async (req, res) => {
    const { ips } = req.body;
    const resultados = [];

    // Verifica cada IP
    for (const ip of ips) {
        const resPing = await ping.promise.probe(ip);
        resultados.push({
            ip,
            status: resPing.alive ? 'success' : 'fail'
        });
    }

    // Envia os resultados
    res.json(resultados);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
