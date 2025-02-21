// para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

const n1 = prompt("digite o primeiro numero: ");
console.log(n1);

// function calcularDesconto(preco, desconto){
//     const resultado = preco - (preco * desconto / 100);
//     console.log("o valor com desconto é:", resultado);  // Exibe o resultado no console
// }
// calcularDesconto(preco, desconto);  // Chama a função para calcular o desconto
