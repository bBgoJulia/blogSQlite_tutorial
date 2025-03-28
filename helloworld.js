const express = require("express");

const app = express();

app.get('/', (req, res)=>{
    res.send("olá sesi!");
})

const PORT = 3000; //porta TCP do servidor http da apllicação

app.listen(PORT, ()  =>  {
    console.log(`Servidor sendo executado na porta ${PORT}!`);
}