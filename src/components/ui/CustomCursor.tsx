import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Framer motion variants to smoothly animate to the mouse position
    const variants = {
        default: {
            x: mousePosition.x - 200, // half the width to center
            y: mousePosition.y - 200, // half the height to center
            transition: {
                type: "spring" as const,
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }
        }
    };

    return (
        <motion.div
            className="custom-cursor-glow"
            variants={variants}
            animate="default"
        />
    );
};

export default CustomCursor;
