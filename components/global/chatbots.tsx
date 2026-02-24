"use client"

import { getMyBusinesses } from "@/actions/business"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Eye, EyeOff, Copy, Check } from "lucide-react"

const Chatbots = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-businesses"],
    queryFn: getMyBusinesses, 
  })

  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 animate-pulse">
        Loading chatbots...
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        No chatbots created yet
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-12 space-y-10">
      {data.map((business) => {
        const isRevealed = revealed[business.id]

        const scriptSnippet = `<script src="https://yourdomain.com/chatBot.js" data-business-id="${business.id}" data-bg="#000000" data-color="white"></script>`

        const reactSnippet = `import { Chatbot } from "chatbot-sdk"

export default function Page() {
  return <Chatbot businessId="${business.id}" />
}`

        return (
          <div
            key={business.id}
            className=" border rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-6">
              {business.businessName}
            </h2>

            {/* SCRIPT SECTION */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  HTML Script Embed
                </span>

                <div className="flex gap-2">
                  {/* Hide ID Button */}
                  <button
                    onClick={() => toggleReveal(business.id)}
                    className="p-2 rounded-lg border hover:bg-gray-100 transition active:scale-95"
                  >
                    {isRevealed ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                  {/* Copy Script */}
                  <button
                    onClick={() =>
                      handleCopy(scriptSnippet, business.id + "-script")
                    }
                    className={`p-2 rounded-lg border transition active:scale-95 ${
                      copied === business.id + "-script"
                        ? "bg-green-500 text-white border-green-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {copied === business.id + "-script" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              <pre className="bg-zinc-900 text-zinc-100 text-sm p-5 rounded-xl overflow-x-auto font-mono">
                {`<script src="https://yourdomain.com/chatBot.js" data-business-id="`}
                <span
                  className={`transition-all duration-500 ${
                    isRevealed
                      ? "opacity-100 blur-0"
                      : "opacity-60 blur-sm select-none"
                  }`}
                >
                  {business.id}
                </span>
                {`" data-bg="#000000" data-color="white"></script>`}
              </pre>
            </div>

            {/* REACT / NEXT SECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium ">
                  React / Next.js Component
                </span>

                {/* Copy React */}
                <button
                  onClick={() =>
                    handleCopy(reactSnippet, business.id + "-react")
                  }
                  className={`p-2 rounded-lg border transition active:scale-95 ${
                    copied === business.id + "-react"
                      ? "bg-green-500 text-white border-green-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {copied === business.id + "-react" ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <pre className="bg-zinc-900 text-zinc-100 text-sm p-5 rounded-xl overflow-x-auto font-mono whitespace-pre-wrap">
{`import { Chatbot } from "chatbot-sdk"

export default function Page() {
  return <Chatbot businessId="`}
<span
  className={`transition-all duration-500 ${
    isRevealed
      ? "opacity-100 blur-0"
      : "opacity-60 blur-sm select-none"
  }`}
>
  {business.id}
</span>
{`" />
}`}
              </pre>
            </div>
          </div>
        )
        
      })}
    </div>
  )
  
}

export default Chatbots

