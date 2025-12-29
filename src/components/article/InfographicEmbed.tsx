interface InfographicEmbedProps {
    title: string;
    embedUrl: string;
}

export function InfographicEmbed({ title, embedUrl }: InfographicEmbedProps) {
    // Check if it's a known embed source and adjust accordingly
    const isOJK = embedUrl.includes("ojk.go.id");
    const isBI = embedUrl.includes("bi.go.id");
    const isDatawrapper = embedUrl.includes("datawrapper");
    const isFlourisj = embedUrl.includes("flourish");

    return (
        <div className="my-8 rounded-xl border bg-card overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                    📊 {title}
                    {isOJK && (
                        <span className="text-xs text-muted-foreground">
                            Sumber: OJK
                        </span>
                    )}
                    {isBI && (
                        <span className="text-xs text-muted-foreground">
                            Sumber: Bank Indonesia
                        </span>
                    )}
                </h4>
            </div>
            <div className="relative w-full" style={{ minHeight: "400px" }}>
                {(isDatawrapper || isFlourisj) ? (
                    <iframe
                        src={embedUrl}
                        className="w-full h-full absolute inset-0"
                        style={{ minHeight: "400px" }}
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                    />
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                            Infografis dari sumber eksternal:
                        </p>
                        <a
                            href={embedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Lihat Infografis
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
