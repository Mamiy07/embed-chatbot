"use client";

import { useState } from "react";

const codeSnippets = {
  install: `npm i @mamiy/chatbot`,
  reactEmbed: `import { Chatbot } from '@mamiy/chatbot';

export default function Page() {
  return <Chatbot businessId="YOUR_BUSINESS_ID" />;
}`,
  htmlEmbed: `<script
  src="https://yourdomain.com/chatBot.js"
  data-business-id="YOUR_BUSINESS_ID"
  data-bg="#000000"
  data-color="white"
></script>`,
};

export default function EmbedAIDocs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I switch AI providers later?",
      answer:
        "Yes, just update the AI provider and model in your dashboard; no code changes needed.",
    },
    {
      question: "Can I embed multiple chatbots on one page?",
      answer:
        "Currently, one chatbot per page is supported. Multiple embeds require separate pages or instances.",
    },
    {
      question: "Does it support SSR?",
      answer:
        "Yes. The React component works with Next.js App Router and Server Components.",
    },
    {
      question: "How do I train the chatbot?",
      answer:
        "Provide your business description in the dashboard. The more details you provide (FAQs, tone, policies), the smarter the AI responses.",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
      <h1 className="text-4xl font-bold mb-4">EmbedAI Documentation</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting Started</h2>
        <p>
          EmbedAI lets you add a fully branded AI chatbot to your Next.js
          application in <strong>one line of code</strong>. It supports multiple
          AI providers, is fully themeable, and works with SSR.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">1. Install the package</h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded relative">
          <code>{codeSnippets.install}</code>
          <button
            onClick={() => copyToClipboard(codeSnippets.install)}
            className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
          >
            Copy
          </button>
        </pre>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">2. React Embed</h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded relative">
          <code>{codeSnippets.reactEmbed}</code>
          <button
            onClick={() => copyToClipboard(codeSnippets.reactEmbed)}
            className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
          >
            Copy
          </button>
        </pre>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">3. HTML Script Embed</h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded relative">
          <code>{codeSnippets.htmlEmbed}</code>
          <button
            onClick={() => copyToClipboard(codeSnippets.htmlEmbed)}
            className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
          >
            Copy
          </button>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Configuration Options</h2>
        <table className="w-full text-left border border-gray-300 rounded">
          <thead >
            <tr>
              <th className="px-4 py-2 border">Prop / Attribute</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Default</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">businessId</td>
              <td className="px-4 py-2 border">string</td>
              <td className="px-4 py-2 border">required</td>
              <td className="px-4 py-2 border">Unique business ID from dashboard</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">bgColor</td>
              <td className="px-4 py-2 border">string</td>
              <td className="px-4 py-2 border">#000000</td>
              <td className="px-4 py-2 border">Button background color</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">textColor</td>
              <td className="px-4 py-2 border">string</td>
              <td className="px-4 py-2 border">#ffffff</td>
              <td className="px-4 py-2 border">Button text/icon color</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">iconUrl</td>
              <td className="px-4 py-2 border">string</td>
              <td className="px-4 py-2 border">-</td>
              <td className="px-4 py-2 border">Optional custom icon</td>
            </tr>
          </tbody>
        </table>
      </section>

     
    </div>
  );
}