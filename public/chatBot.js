(function () {
  const api_Url = "http://localhost:3000/api/chat";
const scriptTag =
  document.currentScript ||
  document.querySelector('script[data-business-id]');
  const businessId = scriptTag.getAttribute("data-business-id");

  if (!businessId) {
    console.error("Business ID is required");
    return;
  }

  const button = document.createElement("button");
  const position = scriptTag.getAttribute("data-position") || "bottom-right";
  const icon = scriptTag.getAttribute("data-icon") || "🗨️";
  const bgColor = scriptTag.getAttribute("data-bg") || "#000";
  const textColor = scriptTag.getAttribute("data-color") || "#fff";
  const iconUrl = scriptTag.getAttribute("data-icon")

if (iconUrl) {
  button.innerHTML = `<img src="${iconUrl}" style="width:50%;height:50%;" />`
} else {
  button.innerHTML = icon
}
  if (position === "bottom-left") {
    button.style.left = "40px";
    button.style.bottom = "40px";
  } else if (position === "top-right") {
    button.style.right = "40px";
    button.style.top = "40px";
  } else if (position === "top-left") {
    button.style.left = "40px";
    button.style.top = "40px";
  } else {
    button.style.right = "40px";
    button.style.bottom = "40px";
  }
  Object.assign(button.style, {
    position: "fixed",
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
})();
