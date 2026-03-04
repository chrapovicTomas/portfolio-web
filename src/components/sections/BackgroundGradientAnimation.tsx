import React, { useEffect, useRef, useState } from "react";
import './BackgroundGradientAnimation.css';

export const BackgroundGradientAnimation = ({
    gradientBackgroundStart = "rgb(5, 8, 16)", // Very dark slate
    gradientBackgroundEnd = "rgb(12, 8, 24)", // Very dark indigo
    firstColor = "59, 130, 246", // Blue primary
    secondColor = "139, 92, 246", // Purple secondary
    thirdColor = "96, 165, 250", // Light blue
    fourthColor = "167, 139, 250", // Light purple
    fifthColor = "59, 130, 246", // Blue primary
    pointerColor = "139, 92, 246", // Purple interaction
    size = "0%",
    blendingValue = "hard-light",
    children,
    className = "",
    interactive = true,
    containerClassName = "",
}: {
    gradientBackgroundStart?: string;
    gradientBackgroundEnd?: string;
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    pointerColor?: string;
    size?: string;
    blendingValue?: string;
    children?: React.ReactNode;
    className?: string;
    interactive?: boolean;
    containerClassName?: string;
}) => {
    const interactiveRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [tgX, setTgX] = useState(0);
    const [tgY, setTgY] = useState(0);

    useEffect(() => {
        document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
        document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
        document.body.style.setProperty("--first-color", firstColor);
        document.body.style.setProperty("--second-color", secondColor);
        document.body.style.setProperty("--third-color", thirdColor);
        document.body.style.setProperty("--fourth-color", fourthColor);
        document.body.style.setProperty("--fifth-color", fifthColor);
        document.body.style.setProperty("--pointer-color", pointerColor);
        document.body.style.setProperty("--size", size);
        document.body.style.setProperty("--blending-value", blendingValue);
    }, [
        gradientBackgroundStart,
        gradientBackgroundEnd,
        firstColor,
        secondColor,
        thirdColor,
        fourthColor,
        fifthColor,
        pointerColor,
        size,
        blendingValue,
    ]);

    useEffect(() => {
        function move() {
            if (!interactiveRef.current) {
                return;
            }
            setCurX(curX + (tgX - curX) / 20);
            setCurY(curY + (tgY - curY) / 20);
            interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        }

        const animationFrameId = requestAnimationFrame(move);
        return () => cancelAnimationFrame(animationFrameId);
    }, [tgX, tgY, curX, curY]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setTgX(event.clientX - rect.left);
                setTgY(event.clientY - rect.top);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    return (
        <div
            ref={containerRef}
            className={`gradient-bg-container ${containerClassName}`}
        >
            <svg className="gradient-bg-svg">
                <defs>
                    <filter id="blurMe">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className={`gradient-bg-content ${className}`}>{children}</div>
            <div
                className={`gradients-container ${isSafari ? "safari-blur" : "normal-blur"}`}
            >
                <div className="gradient-orb gradient-first"></div>
                <div className="gradient-orb gradient-second"></div>
                <div className="gradient-orb gradient-third"></div>
                <div className="gradient-orb gradient-fourth"></div>
                <div className="gradient-orb gradient-fifth"></div>

                {interactive && (
                    <div
                        ref={interactiveRef}
                        className="gradient-interactive"
                    ></div>
                )}
            </div>
        </div>
    );
};
