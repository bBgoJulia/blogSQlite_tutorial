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

app.get("/", (req, res)=>{
    console.log("GET /index");
    //rota raiz do meu servidor, acesse o browser com o endereço http://localhost
    //res.send(index);
    res.redirect("/cadastro");
})

app.get("/home", (req, res)=>{
    console.log("GET /home");
    //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/home
    res.send(home);
})

app.get("/sobre", (req, res)=>{
console.log("GET /sobre");
 //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/sobre
    res.render("sobre");

});

app.get("/login", (req, res)=>{
    console.log("GET /login");
     //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/login
    res.render("login");
});

app.post("/login", (req, res) => {
    console.log("POST /login");
    res.send("login ainda não implementado");

} );

app.get("/cadastro", (req, res)=>{
    console.log("GET /cadastro");
     //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/cadastro 
    res.render("cadastro");
});

//POST do cadastro

app.post ("/cadastro", (req, res) => {
    console.log("POST /cadastro");
    //linha para depurar se esta vindo dadis no req.body
    ! req.body 
    ? console.log(JSON.stringify(req.body))
    :console.log(`Body vazio: ${req.body}`);

    const { username, password, email, celular, cpf, rg } = req.body;
    

// colocar aqui as validações e inclusão no banco de dados do cadatsro do usuario
// 1. validar dados usuario

// 2. saber se ele ja existe no banco
const query = 
"SELECT * FROW users WHERE email=$EMAIL OR cpf=$CPF OR rg=$RG OR username=$USERNAME?";"
db.get(query, [email, cpf, rg, username]), (err, row) => {
    if(err) throw err;

    if(row){
        // a varaiavel 'row' ira retornar os dados do banco de dados exectudado atraves do SQL, variavel query
        res.send("usuario ja cadastrado, refaça o cadastro");
    }else {
        // 3. se usuario nao existe no banco cadastrar
      const insertQuery = 
       "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?.?,?)";
       db.run(
        insertQuery
        [username, password, email, celular, cpf, rg],
        (err) => {
            //inserir a logica do INSERT 
            res.send("usuario cadastrado, com sucesso");
        }
       );
    }
};

    res.send(
        `bem vindo usuario: ${req.body.username}, seu email é ${req.body.email}`
    );
    

// o app.listen() precisa ser SEMPRE executado por ultimo.(app.js)
app.listen(PORT, ()  =>  {
    console.log(`Servidor sendo executado na porta ${PORT}!`);
});

