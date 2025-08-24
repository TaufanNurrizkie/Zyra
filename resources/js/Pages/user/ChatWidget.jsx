import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Buat history percakapan untuk memory
      let history = messages.map(msg =>
        msg.sender === "user"
          ? `Pengguna: ${msg.text}`
          : `AI: ${msg.text}`
      ).join("\n");

      // Prompt fokus zakat dengan memory percakapan
const prompt = `
Kamu adalah Zyra AI, asisten AI yang ramah dan ahli dalam Zakat (pemberian sedekah Islam).
Jawablah pertanyaan yang berkaitan dengan Zakat, peraturan, cara menghitung, atau keuangan Islam terkait Zakat.
Untuk pertanyaan ringan atau sapaan seperti "halo", "apa kabar", "siapa kamu", jawab dengan sopan dan ramah.
Jika pertanyaan sama sekali tidak berkaitan dengan Zakat, balas dengan sopan: "Maaf, saya Zyra AI hanya bisa menjawab pertanyaan seputar Zakat."

Percakapan sebelumnya:
${history}

Pertanyaan pengguna: "${input}"
Jawaban Zyra AI:
`;


      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setMessages([...newMessages, { sender: "bot", text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Terjadi kesalahan saat mengambil jawaban" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Tombol Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-3 sm:p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold text-base sm:text-lg">Zyra Ai</h3>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto max-h-60 sm:max-h-80 bg-gray-50">
            {messages.length === 0 && !isLoading ? (
              <div className="text-center text-gray-500 py-6 sm:py-8">
                <p className="text-sm">Mulai percakapan dengan AI seputar Zakat!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-end space-x-2 max-w-[250px] sm:max-w-xs ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                      <span className="hidden sm:inline">{msg.sender === "user" ? "Anda" : "AI"}</span>
                      <span className="sm:hidden">{msg.sender === "user" ? "U" : "AI"}</span>
                    </div>
                    <div className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-br-md" : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"}`}>
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-end space-x-2 max-w-[250px] sm:max-w-xs">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">AI</div>
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay:'0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay:'0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-100 rounded-b-2xl">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ketik pertanyaan tentang Zakat..."
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>➤</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
