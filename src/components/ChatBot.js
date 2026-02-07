'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ReactMarkdown from 'react-markdown';

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    // Custom Chat State
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "SYSTEM ONLINE. \n\nI am the ParaPixel Architect. I can estimate costs, suggest tech stacks, or refine your product vision. \n\nWhat are you building?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // GSAP Open/Close Animation
    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(containerRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    // Prevent background scroll when mouse is inside chat
    const handleWheel = (e) => {
        e.stopPropagation();
    };

    const handleKeyDown = (e) => {
        // Submit on Enter, but allow Shift+Enter for new line
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setIsLoading(true);

        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);

        try {
            setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: newMessages.slice(0, -1)
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to get response from AI. Please try again.");
            }

            if (!response.body) throw new Error("No response received from server.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let botText = "";

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });

                if (chunkValue) {
                    botText += chunkValue;
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { role: 'assistant', content: botText };
                        return updated;
                    });
                }
            }

        } catch (error) {
            console.error("Chat Error:", error);
            let errorMessage = "ERROR: Unable to connect to the server. Please check your internet connection and try again.";

            // Try to parse error response
            if (error.message) {
                errorMessage = `ERROR: ${error.message}`;
            }

            setMessages(prev => {
                const updated = [...prev];
                // Replace the empty assistant message with error
                if (updated[updated.length - 1].role === 'assistant' && updated[updated.length - 1].content === "") {
                    updated[updated.length - 1] = { role: 'assistant', content: errorMessage };
                } else {
                    updated.push({ role: 'assistant', content: errorMessage });
                }
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9000] font-mono flex flex-col items-end pointer-events-auto">

            {isOpen && (
                <div
                    ref={containerRef}
                    className="w-[90vw] md:w-[420px] h-[600px] bg-black border-2 border-[#ccff00] shadow-[15px_15px_0px_rgba(204,255,0,0.2)] flex flex-col mb-4 overflow-hidden relative"
                    onWheel={handleWheel} // Stop scroll propagation
                >

                    {/* HEADER */}
                    <div className="flex justify-between items-center p-3 border-b-2 border-[#ccff00] bg-[#111] shrink-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-[#ccff00] rounded-full animate-pulse shadow-[0_0_10px_#ccff00]"></div>
                            <span className="font-bold text-sm tracking-widest text-[#ccff00]">PARA_ARCHITECT // AI</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-colors font-bold text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* MESSAGES AREA */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 overscroll-contain"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`
                                        max-w-[85%] p-4 text-xs md:text-sm font-bold leading-relaxed relative break-words overflow-wrap-anywhere
                                        ${msg.role === 'user'
                                            ? 'bg-[#ccff00] text-black shadow-[5px_5px_0px_white]'
                                            : 'bg-[#1a1a1a] text-[#ccff00] border-l-4 border-[#ccff00] shadow-[5px_5px_0px_#ccff00/20]'
                                        }
                                    `}
                                    style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                                >
                                    <span className="absolute -top-3 left-0 text-[9px] font-black uppercase tracking-wider px-1 bg-black text-white border border-[#ccff00]">
                                        {msg.role === 'user' ? 'CLIENT' : 'SYSTEM'}
                                    </span>

                                    {/* MARKDOWN RENDERER */}
                                    <div className="markdown-content" style={{ whiteSpace: 'pre-wrap' }}>
                                        <ReactMarkdown
                                            components={{
                                                strong: ({ children }) => <span className="font-black underline decoration-2 underline-offset-2">{children}</span>,
                                                ul: ({ children }) => <ul className="list-disc ml-4 space-y-1 mt-2">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal ml-4 space-y-1 mt-2">{children}</ol>,
                                                li: ({ children }) => <li className="pl-1">{children}</li>,
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* LOADING STATE */}
                        {isLoading && messages[messages.length - 1].role === 'user' && (
                            <div className="flex justify-start">
                                <div className="bg-[#1a1a1a] text-[#ccff00] p-3 text-xs border-l-4 border-[#ccff00] animate-pulse">
                                    `&gt;` ANALYZING REQUEST...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT AREA */}
                    <form onSubmit={handleSend} className="p-3 border-t-2 border-[#ccff00] bg-black flex gap-2 shrink-0 z-10">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your project..."
                            className="flex-1 bg-[#111] text-white placeholder:text-gray-600 outline-none text-sm font-bold px-4 py-3 border border-transparent focus:border-[#ccff00] transition-colors resize-none min-h-[50px] max-h-[120px] overflow-y-auto"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            rows="2"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 bg-[#ccff00] text-black font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            SEND
                        </button>
                    </form>
                </div>
            )}

            {/* TOGGLE BUTTON - ROUND, DREAM POP ICON & CTA */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative w-16 h-16 bg-black border-2 border-[#ccff00] rounded-full flex flex-col items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_#ccff00] overflow-hidden"
                >
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 border border-[#ccff00] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>

                    {/* NEW DREAM POP SVG ICON */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#ccff00] group-hover:animate-pulse mb-0.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        <path d="M9 10h.01"></path>
                        <path d="M15 10h.01"></path>
                        <path d="M12 10h.01"></path>
                        <path d="M10 14a2 2 0 0 0 4 0"></path>
                    </svg>

                    {/* CTA TEXT */}
                    <span className="text-[8px] font-black text-[#ccff00] tracking-widest leading-none">DREAM</span>

                    {/* Badge */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ccff00] rounded-full animate-ping"></span>
                </button>
            )}
        </div>
    );
}