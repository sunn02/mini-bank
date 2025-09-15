    const express = require('express');
    const cors = require('cors');
    const fs = require('fs');
    const bodyParser = require('body-parser');

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const PORT = process.env.PORT || 3000;
    const DB_FILE = './data.json';

    // Función para leer JSON
    const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    // Función para escribir JSON
    const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

    // GET todos los recursos
    app.get('/:resource', (req, res) => {
    const db = readDB();
    const resource = req.params.resource;
    res.json(db[resource] || []);
    });

    // GET recurso por ID
    app.get('/:resource/:id', (req, res) => {
    const db = readDB();
    const resource = req.params.resource;
    const item = (db[resource] || []).find(r => r.id == req.params.id);
    res.json(item || {});
    });

    // POST nuevo recurso
    app.post('/:resource', (req, res) => {
    const db = readDB();
    const resource = req.params.resource;
    const newItem = { id: Date.now(), ...req.body };
    db[resource].push(newItem);
    writeDB(db);
    res.json(newItem);
    });

    // PUT actualizar recurso
    app.put('/:resource/:id', (req, res) => {
    const db = readDB();
    const resource = req.params.resource;
    const index = db[resource].findIndex(r => r.id == req.params.id);
    if (index !== -1) {
        db[resource][index] = { ...db[resource][index], ...req.body };
        writeDB(db);
        res.json(db[resource][index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
    });

    // DELETE recurso
    app.delete('/:resource/:id', (req, res) => {
    const db = readDB();
    const resource = req.params.resource;
    db[resource] = (db[resource] || []).filter(r => r.id != req.params.id);
    writeDB(db);
    res.json({ message: 'Deleted' });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
