// src/components/ui/Message.jsx
import React from "react";
import ReactMarkdown from 'react-markdown';

const Message = ({ text, sender, theme }) => {
    const isDarkTheme = theme === 'dark';
    return (
        <div
            className={`max-w-[85%] break-words rounded-lg p-3 mb-3 shadow-sm ${ // Changed mb-2 to mb-3 for more spacing
                sender === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : `${isDarkTheme ? "mr-auto bg-gray-800 text-gray-200" : "mr-auto bg-gray-100 text-gray-800"} prose prose-sm prose-neutral max-w-none`
            }`}
        >
            {sender === "bot" ? (
                <ReactMarkdown
                    components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all" />,
                    }}
                >
                    {text}
                </ReactMarkdown>
            ) : (
                text
            )}
        </div>
    );
};

export default Message;