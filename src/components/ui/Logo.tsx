import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
    showTextMobile?: boolean;
}

export function Logo({ className, iconOnly = false, showTextMobile = false }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shrink-0">
                <span className="font-bold text-white text-lg">F</span>
            </div>
            {!iconOnly && (
                <span className={cn(
                    "font-bold text-xl",
                    !showTextMobile && "hidden sm:inline-block"
                )}>
                    FinEdu
                </span>
            )}
        </Link>
    );
}

