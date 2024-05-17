const { geraSessao } = require("./src/services/login");
const express = require("express");
const path = require('path'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require('./src/swagger.json');

const app = express();

app.use(session({secret:geraSessao()}))
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(('../public')));
app.use(express.static("."));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/login');
});

const login = require("./src/routes/login");
app.use('/login', login);

const rotaTelaInicial = require("./src/routes/reservas_online");
app.use('/reservasOnline', rotaTelaInicial);

const espacos = require("./src/routes/espacos");
app.use('/gestaoEspaco', espacos);

const minhasReservas = require("./src/routes/minhas_reservas");
app.use('/minhasReservas', minhasReservas);

const usuarios = require("./src/routes/usuarios");
app.use('/usuarios', usuarios);


const port = 8000;
app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})