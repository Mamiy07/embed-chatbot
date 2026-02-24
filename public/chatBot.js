(function () {
  const api_Url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/chat`;
  const scriptTag =
    document.currentScript ||
    document.querySelector("script[data-business-id]");
  const businessId = scriptTag.getAttribute("data-business-id");

  if (!businessId) {
    console.error("Business ID is required");
    return;
  }

  const button = document.createElement("button");
  const icon = scriptTag.getAttribute("data-icon") || "🗨️";
  const bgColor = scriptTag.getAttribute("data-bg") || "#000";
  const textColor = scriptTag.getAttribute("data-color") || "white";
  const iconUrl = scriptTag.getAttribute("data-icon");

  if (iconUrl) {
    button.innerHTML = `<img src="${iconUrl}" style="width:50%;height:50%;" />`;
  } else {
    button.innerHTML = icon;
  }

  Object.assign(button.style, {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    backgroundColor: bgColor,
    color: textColor,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: "999999",
  });
  document.body.appendChild(button);

  const box = document.createElement("div");

  Object.assign(box.style, {
    position: "fixed",
    width: "320px",
    height: "420px",
    borderRadius: "16px",
    bottom: "100px",
    right: "40px",
    border: "1px solid #e5e5e5",
    background: "#ffffff",
    boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
    zIndex: "999999",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    transform: "translateY(20px) scale(0.95)",
    opacity: "0",
    pointerEvents: "none",
    transition: "all 0.25s ease",
  });

  box.innerHTML = `
  <div style="
    padding: 14px;
    display: flex;
    align-items: center;
  justify-content: space-between;
     font-size: 16px;
    background: ${bgColor};
    color: ${textColor};
  ">
   <span style="color: #fff;">Customer Support</span>
   <span id="chat-close" style="cursor: pointer;">✕</span>
  </div>

  <div style="
    height: 1px;
    background: #e5e5e5;
  "></div>

<div id="chat-messages" style="
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
"> <div style=" background: #f1f1f1; padding: 8px 10px; border-radius: 10px; max-width: 80%; margin-bottom: 8px; "> Hi 👋 How can we help you today? </div> </div>

  <div style="
    display: flex;
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    background: #ffffff;
  ">
    <input 
      id="chat-input"
      type="text"
      placeholder="Type your message..."
      style="
        flex: 1;
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
        font-size: 14px;
      "
    />

    <button id="chat-send" style="
      margin-left: 8px;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background: ${bgColor};
      color: ${textColor};
      font-weight: 500;
    ">
      Send
    </button>
  </div>
`;

  document.body.appendChild(box);
  let isOpen = false;

  function openChat() {
    box.style.transform = "translateY(0) scale(1)";
    box.style.opacity = "1";
    box.style.pointerEvents = "auto";
    isOpen = true;
  }

  function closeChat() {
    box.style.transform = "translateY(20px) scale(0.95)";
    box.style.opacity = "0";
    box.style.pointerEvents = "none";
    isOpen = false;
  }

  button.addEventListener("click", () => {
    isOpen ? closeChat() : openChat();
  });

  box.querySelector("#chat-close").addEventListener("click", closeChat);
  const messages = box.querySelector("#chat-messages");
  const input = box.querySelector("#chat-input");
  const sendBtn = box.querySelector("#chat-send");

  function addMessage(text, sender = "user") {
    const msg = document.createElement("div");

    msg.style.maxWidth = "75%";
    msg.style.padding = "10px 12px";
    msg.style.borderRadius = "14px";
    msg.style.fontSize = "14px";
    msg.style.lineHeight = "1.4";
    msg.style.wordWrap = "break-word";

    if (sender === "user") {
      msg.style.alignSelf = "flex-end";
      msg.style.background = bgColor;
      msg.style.color = "#fff";
      msg.style.borderBottomRightRadius = "4px";
    } else {
      msg.style.alignSelf = "flex-start";
      msg.style.background = "#e9eef6";
      msg.style.color = "#333";
      msg.style.borderBottomLeftRadius = "4px";
    }

    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typing-indicator";
    typing.style.alignSelf = "flex-start";
    typing.style.background = "#e9eef6";
    typing.style.padding = "8px 12px";
    typing.style.borderRadius = "14px";
    typing.style.fontSize = "13px";
    typing.style.color = "#555";
    typing.innerText = "Typing...";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }
  async function handleSend() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;

  showTyping();

  try {
    const res = await fetch(api_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        businessId: businessId,
      }),
    });

    removeTyping();

    if (!res.ok) {
      addMessage("Please Contact support", "ai");
      return;
    }

    const data = await res.json();

    if (data?.answer) {
      addMessage(data.answer, "ai");
    } else {
      addMessage("Please Contact support", "ai");
    }

  } catch (error) {
    removeTyping();
    addMessage("Network error. Please Contact support", "ai");
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

  sendBtn.addEventListener("click", handleSend);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
})();
