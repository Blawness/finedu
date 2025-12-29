"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground border-b pb-2">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">
                            {children}
                        </h4>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-muted-foreground">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic">
                            {children}
                        </blockquote>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-bold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic">{children}</em>,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            {children}
                        </a>
                    ),
                    code: ({ children }) => (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                        </code>
                    ),
                    pre: ({ children }) => (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                            {children}
                        </pre>
                    ),
                    img: ({ src, alt }) => {
                        const imgSrc = typeof src === "string" ? src : "";
                        return (
                            <figure className="my-6">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={alt || "Article image"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                    />
                                </div>
                                {alt && (
                                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                                        {alt}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    },
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="w-full border-collapse border border-border">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-border px-4 py-2">{children}</td>
                    ),
                    hr: () => <hr className="my-8 border-border" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
