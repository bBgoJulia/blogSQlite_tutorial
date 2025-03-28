console.log("js conectado");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarsenha = document.getElementById("confirmarsenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "o nome não pode conter numero ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("o email esta invalido");
  } else {
    createDisplayMsgError("");
  }
});

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minuscula!";
  }
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiuscula!";
  }
  if (!/[w_]/.test(senha)) {
    return "A senha deve ter pelo menos uma caractere especial!";
  }
  if (!/[!/\d]/.test(senha)) {
    return "A senha deve ter pelo menos um numero!";
  }
  if (senha.length < 8) {
    return " a senha deve ter pelo menos 8 caracteres!";
  }
  return null;
}

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});

function checkPasswordMatch() {
  return senha.value;
}

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas numeros!");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, "");

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular})`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

celular.addEventListener("input", maskPhoneNumber);
