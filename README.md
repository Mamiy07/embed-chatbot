# EmbedAI

**EmbedAI** is an embeddable AI chatbot that can be integrated into any website with a single script.
It allows developers to quickly add AI-powered conversations to their sites without building a chatbot from scratch.

---

## Technologies Used

* Next.js
* TypeScript
* PostgreSQL
* Tailwind CSS
* AI APIs (OpenAI, Gemini, Anthropic)

---

## Features

* One-click embeddable chatbot script
* Works with any website (HTML, React, Next.js, etc.)
* Real-time streaming AI responses
* Provider-agnostic AI layer supporting multiple models
* Secure API handling and CORS support
* Clean and responsive chatbot interface
* Easy integration with minimal setup

---


## How to Use

EmbedAI can be integrated into websites in **two ways: React component or HTML script embed**.

---

### 1. Install the Package

```bash
npm install @mamiy/chatbot
```

---

### 2. React Integration (Next.js / React)

Import the chatbot component and pass your **businessId**.

```javascript
import { Chatbot } from "@mamiy/chatbot";

export default function Page() {
  return <Chatbot businessId="YOUR_BUSINESS_ID" />;
}
```

---

### 3. HTML Script Embed

For non-React websites, you can embed the chatbot using a script tag.

```html
<script
  src="https://yourdomain.com/chatBot.js"
  data-business-id="YOUR_BUSINESS_ID"
  data-bg="#000000"
  data-color="white"
></script>
```

---

### Configuration Options

| Prop / Attribute | Type   | Default  | Description                       |
| ---------------- | ------ | -------- | --------------------------------- |
| businessId       | string | required | Unique business ID from dashboard |
| bgColor          | string | #000000  | Chat button background color      |
| textColor        | string | #ffffff  | Chat button text/icon color       |
| iconUrl          | string | optional | Custom chatbot icon               |

---

Once embedded, the chatbot automatically connects to your configured AI provider and starts responding to users in real time.


## What I Learned

* Designing **framework-agnostic embeddable scripts**
* Building a **provider abstraction layer for multiple AI APIs**
* Implementing **streaming AI responses**
* Handling **CORS and security for third-party integrations**
* Structuring scalable APIs for external embedding
* Deploying full-stack applications on **Vercel**
