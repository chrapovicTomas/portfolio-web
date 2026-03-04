import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import './Education.css';

const educationData = [
    {
        institution: "Technical University of Košice",
        degree: "Master's Degree in Computer Science",
        period: "2025 - Present",
        location: "Košice, Slovakia",
        description: "Study focused on advanced software engineering, artificial intelligence and parallel system architecture.",
        status: "active"
    },
    {
        institution: "Technical University of Košice",
        degree: "Bachelor's Degree in Computer Science",
        period: "2022 - 2025",
        location: "Košice, Slovakia",
        description: "Fundamentals of programming, data structures, operating systems and networks.",
        status: "completed"
    },
    {
        institution: "Church Grammar School of St. Cyril and Method",
        degree: "High School Education with Maturita",
        period: "2018 - 2022",
        location: "Snina, Slovakia",
        description: "Grammar School with School Leaving Examination (Maturita) in Computer Science, Mathematics, and English.",
        status: "completed"
    }
];

// Extracted to manage individual scroll intersection state
const TimelineItem = ({ item }: { item: any }) => {
    const itemRef = useRef(null);
    // when the element is halfway through the viewport, consider it "in view" to activate the glow
    const isInView = useInView(itemRef, { margin: "-40% 0px -40% 0px" });

    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["0 1", "1 0"] // Element enters bottom of viewport, element exits top of viewport
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // 3D rotations for a pronounced cylinder effect:
    // Bottom of viewport (0): leaning back
    // Middle of viewport (0.5): flat
    // Top of viewport (1): leaning forward
    const rotateX = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ["60deg", "0deg", "0deg", "-60deg"]);
    const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [150, 0, 0, -150]);
    const z = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-300, 0, 0, -300]);

    return (
        <div ref={itemRef} className="timeline-item-container">

            {/* Left side: Animated Content Card */}
            <div className="timeline-left">
                <motion.div
                    className={`timeline-content glass-panel ${isInView ? 'active-item' : ''}`}
                    style={{
                        rotateX,
                        scale,
                        opacity,
                        y,
                        z,
                        transformPerspective: 1200,
                        transformStyle: "preserve-3d"
                    }}
                >
                    <h3 className="institution">{item.institution}</h3>
                    <h4 className="degree text-gradient">{item.degree}</h4>

                    <div className="meta-info">
                        <span className="meta-item">
                            <MapPin size={14} />
                            {item.location}
                        </span>
                    </div>

                    <p className="description">{item.description}</p>
                </motion.div>
            </div>

            {/* Middle: Dot */}
            <div className={`timeline-dot ${isInView ? 'active-item-dot' : ''}`}>
                <GraduationCap size={16} />
            </div>

            {/* Right side: Sticky Relayed Date */}
            <div className="timeline-right">
                <div className="sticky-date-wrapper">
                    <h2 className={`sticky-date ${isInView ? 'active-date' : ''}`}>
                        {item.period}
                    </h2>
                </div>
            </div>

        </div>
    );
};

const Education: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"] // tracks the scroll percentage as the container moves past the vertical center
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="education" className="education section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">Edu<span className="text-gradient">cation.</span></h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="timeline-container" ref={containerRef}>
                    {/* The static dim line behind */}
                    <div className="timeline-line"></div>
                    {/* The animated glowing overlay line */}
                    <motion.div
                        className="timeline-line-glow"
                        style={{ height: lineHeight }}
                    ></motion.div>

                    <div className="timeline-items">
                        {educationData.map((item, index) => (
                            <TimelineItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
