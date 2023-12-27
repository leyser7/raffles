const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

TABLE_NAME = "tickets";


const client = new DynamoDBClient(
    {
        region: "us-east-1",
        endpoint: "http://localhost:4566"
    }
);

// Ruta para obtener todos los tickets
app.get('/tickets', async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await client.send(new ScanCommand(params));
        res.json(data.Items);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para crear/modificar un nuevo ticket
app.post('/tickets', async (req, res) => {
    const newTicket = req.body;
    const params = {
        TableName: TABLE_NAME,
        Item: newTicket
    };

    try {
        await client.send(new PutCommand(params));
        res.json(newTicket);
    } catch (err) {
        res.status(500).send(err);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));