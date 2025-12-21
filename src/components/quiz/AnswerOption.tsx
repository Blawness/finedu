"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

    return (
        <motion.div
            custom={index}
            variants={answerVariants}
            initial="initial"
            animate={getVariantState()}
            whileHover={!isRevealed && !disabled ? "hover" : undefined}
            whileTap={!isRevealed && !disabled ? "tap" : undefined}
        >
            <Button
                variant={isSelected ? "default" : "outline"}
                className={cn(
                    "w-full justify-start text-left p-4 h-auto min-h-[60px] transition-all",
                    isRevealed && isCorrect && "bg-green-500 hover:bg-green-500 text-white border-green-500",
                    isRevealed && isSelected && !isCorrect && "bg-red-500 hover:bg-red-500 text-white border-red-500",
                    !isRevealed && isSelected && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={onSelect}
                disabled={isRevealed || disabled}
            >
                <span className="flex items-center gap-3 w-full">
                    <span
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0",
                            isSelected
                                ? "bg-primary-foreground text-primary"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {isRevealed && isCorrect ? (
                            <Check className="w-4 h-4" />
                        ) : isRevealed && isSelected && !isCorrect ? (
                            <X className="w-4 h-4" />
                        ) : (
                            letter
                        )}
                    </span>
                    <span className="flex-1">{content}</span>
                </span>
            </Button>
        </motion.div>
    );
}
