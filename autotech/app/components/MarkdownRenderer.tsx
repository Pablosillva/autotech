import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ conteudo }: { conteudo: string }) {
  return (
    <div className="text-gray-300 leading-relaxed text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-white mt-8 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-orange-500 hover:text-orange-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="bg-gray-800 text-orange-400 px-1.5 py-0.5 rounded text-sm">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-400 my-4">
              {children}
            </blockquote>
          ),
        }}
      >
        {conteudo}
      </ReactMarkdown>
    </div>
  );
}