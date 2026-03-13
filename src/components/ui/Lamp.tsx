import React from 'react';
import { motion } from 'framer-motion';
import './Lamp.css';

interface LampProps {
    children?: React.ReactNode;
    className?: string;
}

export const Lamp: React.FC<LampProps> = ({ children, className }) => {
    return (
        <div className={`lamp-container ${className || ''}`}>
            <div className="lamp-visual">
                {/* Iba svietiaca čiara, ktorá sa animuje */}
                <motion.div
                    initial={{ width: "8rem" }}
                    whileInView={{ width: "16rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="lamp-line"
                />
            </div>

            <div className="lamp-content">
                {children}
            </div>
        </div>
    );
};