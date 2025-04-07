// Modo escuro
const botaoTema = document.createElement("button");
botaoTema.innerText = "Modo Escuro";
botaoTema.style.margin = "1rem";
botaoTema.onclick = () => {
  document.body.classList.toggle("dark-mode");
};
document.body.insertBefore(botaoTema, document.body.firstChild);

// Seleciona os posts
const posts = document.querySelectorAll(".post");

// Função para ativar posts visíveis
function ativarPostsVisiveis() {
  posts.forEach(post => {
    const top = post.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      post.classList.add("ativo");
    }
  });
}

// Ativa os posts visíveis ao rolar
window.addEventListener("scroll", ativarPostsVisiveis);

// Ativa os posts visíveis logo ao carregar (para telas pequenas ou sem rolagem)
document.addEventListener("DOMContentLoaded", ativarPostsVisiveis);

// Configuração Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seuprojeto.firebaseapp.com",
  projectId: "seuprojeto",
  storageBucket: "seuprojeto.appspot.com",
  messagingSenderId: "XXXXXXXXX",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enviar comentário
document.getElementById("form-comentario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nomeComentario").value;
  const texto = document.getElementById("textoComentario").value;

  await db.collection("comentarios").add({
    nome,
    texto,
    data: new Date().toISOString()
  });

  document.getElementById("form-comentario").reset();
  carregarComentarios();
});

// Carregar comentários
async function carregarComentarios() {
  const container = document.getElementById("comentarios");
  container.innerHTML = "";
  const snapshot = await db.collection("comentarios").orderBy("data", "desc").get();
  snapshot.forEach(doc => {
    const c = doc.data();
    container.innerHTML += `<p><strong>${c.nome}:</strong> ${c.texto}</p>`;
  });
}

carregarComentarios();

// Inicializa o EmailJS
emailjs.init("fDOQ4QzDf57be34wr");

document.getElementById("form-contato").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm('service_n7vho99', 'template_bqh9bus', this)
    .then(function() {
      alert('Mensagem enviada com sucesso!');
    }, function(error) {
      alert('Erro ao enviar. Tente novamente.');
      console.error('EmailJS error:', error);
    });

  this.reset();
});

function mostrarModo(modo) {
  const simples = document.getElementById("conteudo-simples");
  const tecnologico = document.getElementById("conteudo-tecnologico");

  if (modo === 'simples') {
    simples.style.display = 'block';
    tecnologico.style.display = 'none';
  } else {
    simples.style.display = 'none';
    tecnologico.style.display = 'block';
  }
}
