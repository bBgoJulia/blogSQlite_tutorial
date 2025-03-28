const express = require("express"); // Importa a livraria do EXPRESS
const sqlite3 = require("sqlite3"); // Importa a livraria do SQLITE3
const bodyParser = require("body-parser"); //importa o body-parser

const PORT = 3000; //porta TCP do servidor http da apllicação

const app = express(); // Instância para o uso do EXPRESS

const db = new sqlite3.Database("user.db"); // Instância para o uso do sqlite3

db.serialize(()=> {
    // Este método permite enviar comandos SQL em modo "SEQUENCIAL"
    db.run(
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT, email
        TEXT,celular TEXT, cpf TEXT, tg TEXT)`
    );
});

app.use("/static", express.static(__dirname + "/static"));

// configurar EJS como motor de visualização
app.set("view engine", "ejs");

// Cria conexão com o BD
const index = "<a href='/home'>HOME</a> <br> <a href='/sobre'>SOBRE</a> <br> <a href='/login'>LOGIN</a> <br> <a href='/cadastro'>CADASTRO</a> <br>";
const home = "Você está na página HOME!! <br> <a href='/voltar'>VOLTAR</a> ";
const sobre = "Você está na página SOBRE!! <br> <a href='/voltar'>VOLTAR</a> ";
const login = "Você está na página LOGIN!! <br> <a href='/voltar'>VOLTAR</a> ";
const cadastro = "Você está na página CADASTRO!! <br> <a href='/voltar'>VOLTAR</a> ";

app.use(bodyParser.urlencoded({ extended: true}));


// São as rotas raiz do servidor B

app.get('/', (req, res)=>{
    //rota raiz do meu servidor, acesse o browser com o endereço http://localhost
    //res.send(index);
    res.render("index");
})

app.get('/home', (req, res)=>{
    res.send(home);
})

app.get('/sobre', (req, res)=>{
    res.send(sobre);
})

app.get('/login', (req, res)=>{
    res.send(login);
})

app.post("/login", (req, res) => {
    res.send("login ainda não implementado");
} );

app.get('/cadastro', (req, res)=>{
    res.send(cadastro);
});

app.post ("/cadastro", (req, res) => {
    req.body ? console.log(JSON.stringify(req.body))
    :console.log(`Body vazio: ${req.body}`)
    res.send(
        `bem vindo usuario: ${req.body.username}, seu email é ${req.body.email``}
    );

});

app.listen(PORT, ()  =>  {
    console.log(`Servidor sendo executado na porta ${PORT}!`);
});

