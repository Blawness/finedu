"use client";

import { motion } from "framer-motion";
import { answerVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface AnswerOptionProps {
    content: string;
    index: number;
    isSelected: boolean;
    isCorrect?: boolean;
    isRevealed: boolean;
    onSelect: () => void;
    disabled?: boolean;
}

export function AnswerOption({
    content,
    index,
    isSelected,
    isCorrect,
    isRevealed,
    onSelect,
    disabled = false,
}: AnswerOptionProps) {
    const letter = String.fromCharCode(65 + index);

    const getVariantState = () => {
        if (!isRevealed) return isSelected ? "tap" : "animate";
        if (isSelected) return isCorrect ? "correct" : "incorrect";
        if (isCorrect) return "correct";
        return "animate";
    };

    // Determine styling based on state
    const getButtonStyles = () => {
        // After reveal - show correct answer in green
        if (isRevealed && isCorrect) {
            return "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500 border-2";
        }
        // After reveal - show wrong selection in red
        if (isRevealed && isSelected && !isCorrect) {
            return "bg-red-500 hover:bg-red-500 text-white border-red-500 border-2";
        }
        // Before reveal - selected state
        if (!isRevealed && isSelected) {
            return "bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2";
        }
        // Default - not selected
        return "bg-background hover:bg-muted border border-input";
    };

    const getCircleStyles = () => {
        if (isRevealed && isCorrect) {
            return "bg-white text-emerald-500";
        }
        if (isRevealed && isSelected && !isCorrect) {
            return "bg-white text-red-500";
        }
        if (!isRevealed && isSelected) {
            return "bg-primary-foreground text-primary";
        }
        return "bg-muted text-muted-foreground";
    };

    return (
        <motion.div
            custom={index}
            variants={answerVariants}
            initial="initial"
            animate={getVariantState()}
            whileHover={!isRevealed && !disabled ? "hover" : undefined}
            whileTap={!isRevealed && !disabled ? "tap" : undefined}
        >
            <button
                type="button"
                className={cn(
                    "w-full flex items-center gap-3 text-left p-4 min-h-[60px] rounded-lg transition-all duration-200",
                    getButtonStyles(),
                    isRevealed && "cursor-default",
                    !isRevealed && !disabled && "cursor-pointer hover:scale-[1.01]"
                )}
                onClick={onSelect}
                disabled={isRevealed || disabled}
            >
                <span
                    className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 transition-colors",
                        getCircleStyles()
                    )}
                >
                    {isRevealed && isCorrect ? (
                        <Check className="w-5 h-5" strokeWidth={3} />
                    ) : isRevealed && isSelected && !isCorrect ? (
                        <X className="w-5 h-5" strokeWidth={3} />
                    ) : (
                        letter
                    )}
                </span>
                <span className="flex-1 font-medium">{content}</span>

                {/* Additional feedback icon on the right */}
                {isRevealed && (
                    <span className="ml-auto shrink-0">
                        {isCorrect ? (
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        ) : isSelected && !isCorrect ? (
                            <X className="w-6 h-6 text-white" strokeWidth={3} />
                        ) : null}
                    </span>
                )}
            </button>
        </motion.div>
    );
}
