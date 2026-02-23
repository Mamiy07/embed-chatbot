"use client"

import { getMyBusinesses } from "@/actions/business"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const Chatbots = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-businesses"],
    queryFn: getMyBusinesses,
  })

  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading...
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        No chatbots created yet
      </div>
    )
  }

  const handleCopy = async (businessId: string) => {
    const script = `<script src="https://yourdomain.com/chatBot.js" data-business-id="${businessId}" data-bg="#000000" data-color="white"></script>`

    await navigator.clipboard.writeText(script)
    setCopiedId(businessId)

    setTimeout(() => setCopiedId(null), 1200)
  }

  const toggleReveal = (businessId: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [businessId]: !prev[businessId]
    }))
  }

  return (
    <div className="space-y-8 w-400   px-6 py-8">
      {data.map((business) => {
        const isRevealed = revealedIds[business.id]

        return (
          <div
            key={business.id}
            className="p-6 border rounded-xl shadow-sm "
          >
            <h2 className="text-lg font-semibold mb-4">
              {business.businessName}
            </h2>

            <div className="flex items-start gap-4">
              
              {/* Code Block */}
              <div className="relative w-full">
                <pre className="bg-gray-900 text-gray-100 text-sm p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`<script src="http://localhost:3000/chatBot.js" data-business-id="`}
<span
  className={`inline-block transition-all duration-300 ${
    isRevealed
      ? "opacity-100 blur-0"
      : "opacity-60 blur-sm select-none"
  }`}
>
  {business.id}
</span>
{`" data-bg="#000000" data-icon="🗨️" data-color="white"> </script>`}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-2 h-15 ">
                <button
                  onClick={() => handleCopy(business.id)}
                  className="px-3 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                >
                  {copiedId === business.id ? "✓ Copied" : "Copy"}
                </button>

                <button
                  onClick={() => toggleReveal(business.id)}
                  className="p-2 border rounded-md hover:bg-gray-100 transition text-sm"
                >
                  {isRevealed ? "🙈" : "👁"}
                </button>
              </div>

            </div>
          </div>
        )
      })}
      
    </div>
  )
}

export default Chatbots