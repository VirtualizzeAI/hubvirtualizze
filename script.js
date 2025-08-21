// Usuário padrão inicial
if (!localStorage.getItem("usuario")) {
  localStorage.setItem("usuario", JSON.stringify({
    nome: "Admin",
    email: "admin@teste.com",
    senha: "1234"
  }));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (email === usuario.email && senha === usuario.senha) {
    localStorage.setItem("logado", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("msg").innerText = "Email ou senha incorretos!";
  }
}

// Proteção de páginas
function protegerPagina() {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
  } else {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (document.getElementById("nomeUsuario")) {
      document.getElementById("nomeUsuario").innerText = usuario.nome;
    }
  }
}

// Logout
function logout() {
  localStorage.setItem("logado", "false");
  window.location.href = "login.html";
}

// Disparos
function disparar() {
  const palavra = document.getElementById("keyword").value;

  fetch(CONFIG.N8N_WEBHOOK_DISPARO, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({campanha: palavra})
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("resultado").innerText =
      "Fluxo disparado! Resposta: " + JSON.stringify(data);
  })
  .catch(err => {
    document.getElementById("resultado").innerText = "Erro: " + err;
  });


  document.getElementById("resultado").innerText =
    "Disparo realizado com a palavra-chave: " + palavra;
}

// Carregar perfil
function carregarPerfil() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("emailPerfil").value = usuario.email;
  document.getElementById("senhaPerfil").value = usuario.senha;
}

// Salvar perfil
function salvarPerfil() {
  const novoUsuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("emailPerfil").value,
    senha: document.getElementById("senhaPerfil").value
  };
  localStorage.setItem("usuario", JSON.stringify(novoUsuario));
  document.getElementById("msgPerfil").innerText = "Dados atualizados!";
}
