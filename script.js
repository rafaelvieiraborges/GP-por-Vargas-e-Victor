let user = null;

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
}

// 🔓 LOGOUT
function logout() {
  location.reload();
}

// 🔙 HOME
function goHome() {
  hideAll();
  document.getElementById("chatSection").classList.remove("hidden");
}

// 📊 MONITORAMENTO
function showMonitor() {
  hideAll();

  document.getElementById("monitorScreen").classList.remove("hidden");

  document.getElementById("mon_id").innerText = device.id;
  document.getElementById("mon_status").innerText = device.status;
  document.getElementById("mon_time").innerText = device.lastUpdate;
}

// 📞 SUPORTE
function showSupport() {
  hideAll();
  document.getElementById("supportScreen").classList.remove("hidden");
}

// 🧼 ESCONDER TUDO
function hideAll() {
  document.getElementById("chatSection").classList.add("hidden");
  document.getElementById("monitorScreen").classList.add("hidden");
  document.getElementById("supportScreen").classList.add("hidden");
}

// 🚨 PERDI
function reportLost() {
  device.status = "BLOQUEADO";
  device.bloqueado = true;
  updateDevice();

  document.getElementById("lostPanel").classList.remove("hidden");

  alert("Dispositivo bloqueado!");
}

// 🔄 ALTERNAR STATUS
function toggleDevice() {
  if (device.status === "ATIVO") {
    device.status = "BLOQUEADO";
    device.bloqueado = true;
  } else {
    device.status = "ATIVO";
    device.bloqueado = false;
  }

  updateDevice();
}

// 🔓 RECUPERAR
function recoverDevice() {
  const code = document.getElementById("deviceCode").value;
  const bio = document.getElementById("biometric").value;

  if (code === device.id && bio === device.biometria) {
    device.status = "ATIVO";
    device.bloqueado = false;
    updateDevice();

    alert("Recuperado!");
  } else {
    alert("Erro na validação");
  }
}

// 📡 ATUALIZA STATUS
function updateDevice() {
  device.lastUpdate = new Date().toLocaleTimeString();
  console.log("📡 Atualização:", device);
}

// 💬 CHAT
function sendMessage() {
  if (device.bloqueado) {
    addMessage("Sistema", "🚫 Dispositivo bloqueado");
    return;
  }

  const input = document.getElementById("userInput");
  const msg = input.value;

  addMessage("Você", msg);
  addMessage("IA", "✔️ Resposta segura");

  input.value = "";
}

// UI
function addMessage(sender, text) {
  const chat = document.getElementById("chatBox");
  const el = document.createElement("p");

  el.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(el);
}