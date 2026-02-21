"use client"

import { useState } from "react"

export default function TestChatPage() {
  const [message, setMessage] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message || !businessId) return

    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          businessId,
        }),
      })

      const data = await res.json()
      setResponse(data.answer)
    } catch (error) {
      console.error(error)
      setResponse("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-lg  rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-xl font-semibold">Test Chatbot</h1>

        <input
          className="w-full border rounded-md p-2"
          placeholder="Business ID"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
        />

        <textarea
          className="w-full border rounded-md p-2 min-h-[120px]"
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          {loading ? "Thinking..." : "Send"}
        </button>

        {response && (
          <div className="bg-neutral-50 border rounded-md p-3 text-sm">
            <strong>Response:</strong>
            <p className="mt-2 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  )
}