const express = require('express');
const app = express();  // retorna una aplicacion de express

const { infoCursos } = require('./cursos');
const PORT = process.env.PORT || 3000;

// Routers
const routerProgramacion = express.Router();
const routerMatematicas = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);

// ROUTING
app.get('/', (req, res) => {
    res.send('Mi primer servidor. Cursos');
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});

// PROGRAMACION
routerProgramacion.get('/', (req, res) => {     // porque la ruta ya esta definida como /api/cursos/programacion y solo se añadiria lo siguiente
    res.send(JSON.stringify(infoCursos.programacion));
});

// manejar solicitudes de lenguajes de programacion (teniendo en cuenta que hay cientos)
// app.get('/api/cursos/programacion/python', (req, res) => {});    // esto no pq habria q hacer uno por cada lenguaje
// habria que hacer con parametros URL -> permiten generalizar un valor
routerProgramacion.get('/:lenguaje', (req, res) => {   // parametro URL -> :lenguaje (se identifica por ':')
    const lenguaje = req.params.lenguaje;   // lenguaje en req.params.lenguaje es el que hemos puesto como parametro URL
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    // puede estar vacio asi q lo comprobamos
    if (resultado.length === 0) return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);

    // PARAMETRO QUERY -> ordenar segun el numero de vistas de cada lenguaje
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultado.sort((a, b) => a.vistas - b.vistas))); // orden ascendente
    }

    res.send(JSON.stringify(resultado));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if (resultado.length === 0) return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);

    res.send(JSON.stringify(resultado));
});

// MATEMATICAS
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultado = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if (resultado.length === 0) return res.status(404).send(`No se encontraron cursos de ${tema}`);

    res.send(JSON.stringify(resultado));
});