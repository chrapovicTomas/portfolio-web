import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
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
const TimelineItem = ({ item, index }: { item: any; index: number }) => {
    const itemRef = useRef(null);
    // when the element is halfway through the viewport, consider it "in view" to activate the glow
    const isInView = useInView(itemRef, { margin: "-40% 0px -40% 0px" });

    return (
        <motion.div
            ref={itemRef}
            className="timeline-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            <div className={`timeline-dot ${isInView ? 'active-item-dot' : ''}`}>
                <GraduationCap size={16} />
            </div>

            <div className={`timeline-content glass-panel ${isInView ? 'active-item' : ''}`}>
                <h3 className="institution">{item.institution}</h3>
                <h4 className="degree text-gradient">{item.degree}</h4>

                <div className="meta-info">
                    <span className="meta-item">
                        <Calendar size={14} />
                        {item.period}
                    </span>
                    <span className="meta-item">
                        <MapPin size={14} />
                        {item.location}
                    </span>
                </div>

                <p className="description">{item.description}</p>
            </div>
        </motion.div>
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
                    className="section-header right"
                >
                    <div className="section-line"></div>
                    <h2 className="section-title">Edu<span className="text-gradient">cation.</span></h2>
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
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
