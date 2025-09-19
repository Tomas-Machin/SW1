const express = require('express');
const app = express();  // retorna una aplicacion de express

const { infoCursos } = require('./datos/cursos');
const PORT = process.env.PORT || 3000;

// Routers
const routerProgramacion = require('./routers/programacion');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas');
app.use('/api/cursos/matematicas', routerMatematicas);

// ROUTING
app.get('/', (req, res) => {
    res.send('Mi primer servidor. Cursos');
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});