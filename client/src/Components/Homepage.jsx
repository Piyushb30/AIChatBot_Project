import { useState } from "react"
import axios from "axios"
import ReactMarkdown from 'react-markdown'
import LoadingComponent from "./Loader"

const Homepage = () => {
    const [query, setQuery] = useState('')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true)
        setData(null)

        try {
            const response = await axios.post(`http://localhost:8000/ask`, { query });
            if (response.data.status) {
                setData(response.data.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl">
                        AI <span className="text-brand">Chatbot</span>
                    </h1>
                    <p className="mt-3 text-lg text-neutral-500">
                        Experience the power of advanced AI in a clean, minimalist interface.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row min-h-[500px]">
                    {/* Sidebar / Info */}
                    <div className="w-full md:w-1/3 bg-neutral-50 p-8 border-r border-neutral-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Instructions</h3>
                            <ul className="mt-4 space-y-4 text-neutral-600 text-sm">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 text-brand">●</span>
                                    <span className="ml-2">Type your question in the box below.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 text-brand">●</span>
                                    <span className="ml-2">Click "Generate" to get an AI response.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 text-brand">●</span>
                                    <span className="ml-2">Responses are formatted in Markdown.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-8 overflow-y-auto bg-white">
                            <div className="max-w-none [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>code]:bg-neutral-100 [&>code]:px-1 [&>code]:rounded [&>pre]:bg-neutral-900 [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-4">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <LoadingComponent />
                                    </div>
                                ) : data ? (
                                    <div className="animate-fade-in text-neutral-800 leading-relaxed">
                                        <ReactMarkdown>{data}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-neutral-400 opacity-60">
                                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        <p className="text-lg font-medium">Hi, how can I help you today?</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                            <form className="relative group" onSubmit={handleSubmit}>
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask your question..."
                                    className="block w-full rounded-xl border-neutral-200 shadow-sm pr-20 py-4 pl-4 focus:ring-brand focus:border-brand sm:text-sm resize-none transition-all duration-200 bg-white"
                                    rows={2}
                                />
                                <div className="absolute inset-y-0 right-0 flex py-2 pr-2">
                                    <button
                                        type="submit"
                                        disabled={loading || !query.trim()}
                                        className="inline-flex items-center px-4 rounded-lg bg-brand text-white font-medium hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? "..." : "Generate"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
