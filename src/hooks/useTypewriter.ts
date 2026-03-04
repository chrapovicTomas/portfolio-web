import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let timeoutId: number;
        let typingIntervalId: number;

        const startTyping = () => {
            setIsTyping(true);
            setStarted(true);
            let i = 0;
            setDisplayedText(''); // Reset pred začatím

            // Okamžite pridaj prvý znak ak máme text
            if (text.length > 0) {
                setDisplayedText(text.charAt(0));
                i = 1;
            }

            typingIntervalId = window.setInterval(() => {
                if (i < text.length) {
                    setDisplayedText((prev) => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingIntervalId);
                    setIsTyping(false);
                }
            }, speed);
        };

        timeoutId = window.setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(typingIntervalId);
        };
    }, [text, speed, delay]);

    return { displayedText, isTyping, started };
};
