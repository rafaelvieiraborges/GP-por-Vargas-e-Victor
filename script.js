let user = null;
let lastActivity = Date.now();

// 🥽 DISPOSITIVO
let device = {
  id: "GLASS-SEC-7781",
  status: "ATIVO",
  biometria: "1234",
  bloqueado: false,
  lastUpdate: new Date().toLocaleTimeString()
};

// 🕒 RELÓGIO
setInterval(() => {
  document.getElementById("clock").innerText =
    new Date().toLocaleTimeString();
}, 1000);

// 🔐 LOGIN
function login() {
  const username = document.getElementById("username").value;

  if (username.length < 3) {
    alert("Usuário inválido");
    return;
  }

  user = { name: username };

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("chatSection").classList.remove("hidden");

  logSecurity("LOGIN", username);
}

// 🔓 LOGOUT
function logout() {
  location.reload();
}

// 🧭 NAVEGAÇÃO
function goHome() {
  hideAll();
  document.getElementById("chatSection").classList.remove("hidden");
}

function showMonitor() {
  hideAll();
  document.getElementById("monitorScreen").classList.remove("hidden");

  document.getElementById("mon_id").innerText = device.id;
  document.getElementById("mon_status").innerText = device.status;
  document.getElementById("mon_time").innerText = device.lastUpdate;
}

function showSupport() {
  hideAll();
  document.getElementById("supportScreen").classList.remove("hidden");
}

function hideAll() {
  document.getElementById("chatSection").classList.add("hidden");
  document.getElementById("monitorScreen").classList.add("hidden");
  document.getElementById("supportScreen").classList.add("hidden");
}

// 🚨 PERDI ÓCULOS
function reportLost() {
  device.status = "BLOQUEADO";
  device.bloqueado = true;
  updateDevice();

  document.getElementById("lostPanel").classList.remove("hidden");

  logSecurity("DISPOSITIVO PERDIDO", device.id);
}

// 🔐 BLOQUEAR MANUAL (NÃO DESBLOQUEIA!)
function toggleDevice() {
  if (device.bloqueado) {
    alert("Use biometria para desbloquear.");
    return;
  }

  device.status = "BLOQUEADO";
  device.bloqueado = true;

  updateDevice();
  logSecurity("BLOQUEIO MANUAL", device.id);
}

// 🔓 RECUPERAÇÃO SEGURA
function recoverDevice() {
  const code = document.getElementById("deviceCode").value;
  const bio = document.getElementById("biometric").value;

  if (code === device.id && bio === device.biometria) {
    device.status = "ATIVO";
    device.bloqueado = false;
    updateDevice();

    document.getElementById("lostPanel").classList.add("hidden");

    logSecurity("RECUPERAÇÃO", device.id);
    alert("Dispositivo liberado com segurança");
  } else {
    logSecurity("FALHA BIOMETRIA", "tentativa");
    alert("Erro na autenticação");
  }
}

// 📡 UPDATE
function updateDevice() {
  device.lastUpdate = new Date().toLocaleTimeString();
}

// 💬 CHAT
function sendMessage() {
  if (device.bloqueado) {
    addMsg("Sistema", "🚫 Dispositivo bloqueado", "bot");
    return;
  }

  updateActivity();

  const input = document.getElementById("userInput");
  const msg = input.value.toLowerCase();

  addMsg("Você", msg, "user");

  const response = secureAI(msg);

  addMsg("IA", response, "bot");

  input.value = "";
}

// 🛡️ IA SEGURA
function secureAI(msg) {

  // DADOS SENSÍVEIS
  if (
    msg.includes("cpf") ||
    msg.includes("rg") ||
    msg.includes("senha") ||
    msg.includes("dados de funcionários")
  ) {
    logSecurity("TENTATIVA VAZAMENTO", msg);
    return "🚫 Acesso negado: dados sensíveis.";
  }

  // ATAQUE
  if (
    msg.includes("hack") ||
    msg.includes("burlar") ||
    msg.includes("invadir")
  ) {
    logSecurity("ATAQUE DETECTADO", msg);
    return "⚠️ Ação suspeita registrada.";
  }

  return "✔️ Consulta segura.";
}

// 🔐 LOG
function logSecurity(type, data) {
  console.log("🔐 LOG:", type, data);
}

// ⏱️ INATIVIDADE
setInterval(() => {
  if (Date.now() - lastActivity > 60000) {
    alert("Sessão encerrada por segurança.");
    logout();
  }
}, 10000);

function updateActivity() {
  lastActivity = Date.now();
}

// UI
function addMsg(sender, text, type) {
  const chat = document.getElementById("chatBox");
  const el = document.createElement("div");

  el.className = `msg ${type}`;
  el.innerHTML = `<strong>${sender}:</strong> ${text}`;

  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}