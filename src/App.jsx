import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const PROJECTS_DATA = [
    {
        id: "airlink",
        title: "Embedded Systems: Airlink Defense System with Encryption Message for Indigenous people",
        shortDesc: "Encryption message transmission tool built to help the AFP provide services in secluded areas.",
        fullDesc: "Developed an encryption message transmission tool using ESP32 as a transmission message utility, handling software integration with encryption logic using ATECC608a chip and receiver-side architecture. Built to help the AFP provide services for indigenous people in secluded areas.",
        hardware: ["ESP32 Development Module", "ATECC608a Crypto-Chip", "Receiver-side architecture"],
        credentials: [
            { type: "image", label: "Courtesy Call from the President", src: "/Gallery2.png" },
            { type: "image", label: "Embedded System Project", src: "airlink_hardware.jpg" },
            { type: "pdf", label: "AFP Project Documentation", src: "AFP.pdf" }
        ]
    },
    {
        id: "lpg-iot",
        title: "IoT-enabled LPG Leak Detection, Weight Monitoring, and Valve Automatic Shutoff System",
        shortDesc: "Hardware and software development for LPG automation utilizing an ESP32 microcontroller.",
        fullDesc: "Led hardware and software development utilizing an ESP32 microcontroller. Integrates load cell for tank monitoring, MQ-6 gas sensor to detect leaks and gas concentration, and a servo motor embedded with a ball valve for auto shut-off mechanism, providing automation for users in handling LPG and can control via mobile app over the internet.",
        hardware: ["ESP32 Microcontroller", "React-Native", "MQ-6 Gas Sensor", "Load Cell", "Servo Motor with Ball Valve"],
        credentials: [
            { type: "image", label: "View Mobile App Interface", src: "/GaSolve_app.png" }
        ]
    },
    {
        id: "blood-bank",
        title: "Software Design: Blood Bank Management System",
        shortDesc: "Web dashboard created to improve the exchange of data and to enrich scalability.",
        fullDesc: "Collaborated on creating a web dashboard for the project blood bank management system to improve the exchange of data and to enrich scalability. Further, to enhance user experience and streamline operations using modern web technologies.",
        hardware: ["React", "Laravel PHP", "MySQL"],
        credentials: [
            // ADDED THIS PLACEHOLDER FOR YOUR FUTURE IMAGE
            { type: "image", label: "View Dashboard Preview", src: "/bloodbank_image.png" }
        ]
    }
];

export default function Portfolio() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeProjectImage, setActiveProjectImage] = useState(null);
    const [activeProjectPage, setActiveProjectPage] = useState(null);
    const [avatarState, setAvatarState] = useState(isDarkMode ? 'dark' : 'light');
    const toDarkVideoRef = useRef(null);
    const toLightVideoRef = useRef(null);

    useEffect(() => {
        if (isDarkMode && (avatarState === 'light' || avatarState === 'to-light')) {
            setAvatarState('to-dark');
            if (toDarkVideoRef.current) {
                toDarkVideoRef.current.currentTime = 0;
                toDarkVideoRef.current.play().catch(err => console.log("Video delayed:", err));
            }
        } else if (!isDarkMode && (avatarState === 'dark' || avatarState === 'to-dark')) {
            setAvatarState('to-light');
            if (toLightVideoRef.current) {
                toLightVideoRef.current.currentTime = 0;
                toLightVideoRef.current.play().catch(err => console.log("Video delayed:", err));
            }
        }
    }, [isDarkMode]);

    // === THEME LOGIC ===
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    // === SNOW LOGIC ===
    useEffect(() => {
        const date = new Date();
        const currentMonth = date.getMonth();
        if (currentMonth >= 8) {
            const numberOfSnowflakes = 40;
            const createdSnowflakes = [];
            for (let i = 0; i < numberOfSnowflakes; i++) {
                let snow = document.createElement("div");
                snow.className = "snowflake";
                let size = Math.random() * 3 + 2;
                snow.style.width = size + "px";
                snow.style.height = size + "px";
                snow.style.left = Math.random() * 100 + "vw";
                snow.style.animationDuration = Math.random() * 5 + 3 + "s";
                snow.style.animationDelay = Math.random() * 5 + "s";
                document.body.appendChild(snow);
                createdSnowflakes.push(snow);
            }
            return () => createdSnowflakes.forEach(snow => snow.remove());
        }
    }, []);

    // === GALLERY SLIDER LOGIC ===
    const galleryRef = useRef(null);
    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = direction === 'next' ? 300 : -300;
            galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // === CHATBOT LOGIC ===
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: "Hi, I'm Angelo! Thanks for visiting. Ask me anything or pick a topic below:" }
    ]);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = async (text = chatInput) => {
        if (!text.trim() || isLoading) return;
        setIsLoading(true);
        const newMessages = [...chatMessages, { sender: 'user', text: text }];
        setChatMessages(newMessages);
        setChatInput('');
        setChatMessages(prev => [...prev, { sender: 'bot', text: "Thinking..." }]);

        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;
            const url = "https://api.groq.com/openai/v1/chat/completions";

            // === THE CHATBOT'S SHEET ===
            const portfolioContext = `
            You are Angelo's AI Assistant. You represent John Angelo Concepcion, a Computer Engineer and Software Engineer from Manila, Philippines. 
            Rule: Answer strictly based on the following context. If you do not know the answer, tell the user to email johnangeloconcepcion8@gmail.com. Keep answers concise, friendly, and professional (1-2 sentences max).
            Important: make sure in the first sentence of the answer make use of like an idiom and relate it to the question. For example, if the user asks about Angelo's experience, you can start with "Well, I've been around the block a few times..." and then briefly summarize his experience based on the context below.

            BACKGROUND:
            - Education: BS Computer Engineering (Graduating 2026).
            - Focus: Transitioning into full-stack development, specifically using PHP and Laravel for backend architecture.
            - Achievement: Ideathon 2025 Finalist.

            TECH STACK:
            - Frontend: React, JavaScript, TypeScript, Flutter.
            - Backend: PHP, Laravel, Node.js, Python.
            - Hardware/IoT: ESP32 dev modules, C++.
            - Tools/Cloud: Git, AWS, Firebase, MySQL.

            KEY PROJECTS:
            1. IoT LPG Leak Detection System (2025-2026): A household safety thesis project using an ESP32. It uses an MQ-6 gas sensor for leaks, four 50kg load cells with an HX711 amplifier for tank weight monitoring, and a servo motor with a ball valve for auto shut-off.
            2. Airlink Defense System (2025): Software & Hardware Lead. Built an encryption message transmission tool for the Armed Forces of the Philippines (AFP) to provide services to indigenous people in secluded areas.
            3. Red Cross Software System (2022): Project Manager.

            EXPERIENCE:
            1. Started coding in 2021, writing my first "Hello World!" program.
            2. Created a blood bank management web dashboard in 2023 that uses laravel backend framework and react frontend to improve data exchange and scalability.
            `;

            const response = await fetch(url, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: portfolioContext
                        },
                        {
                            role: "user",
                            content: text
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("GROQ REJECTION DETAILS:", errorDetails);
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            const aiText = data.choices[0].message.content;

            setChatMessages(prev => {
                const msgs = prev.slice(0, -1);
                return [...msgs, { sender: 'bot', text: aiText }];
            });

        } catch (error) {
            console.error("GROQ CHATBOT CRASH REPORT:", error);
            setChatMessages(prev => {
                const msgs = prev.slice(0, -1);
                return [...msgs, { sender: 'bot', text: "Oops, my AI brain is resting right now. Feel free to email me directly!" }];
            });
        } finally {
            setIsLoading(false);
        }
    };

   // === 3D IDENTITY CARD LOGIC ===
    const cardRef = useRef(null);
    const [cardStyle, setCardStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        '--mouse-x': '50%',
        '--mouse-y': '50%'
    });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        setCardStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`
        });
    };

    const handleMouseLeave = () => {
        setCardStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            '--mouse-x': '50%',
            '--mouse-y': '50%'
        });
    };

    return (
        <div className="portfolio-wrapper">

            {/* ===================== HEADER ===================== */}
            <header className="profile-header">
                {/* Square profile photo — hover swaps to Gallery4 */}
                <div className="avatar-display-container">
                    <img src="/Formal.png" className="avatar-display-container" alt="Profile" />
                  {/*}  <img 
                        src="Me.jpg" 
                        className={`avatar-asset ${avatarState === 'light' ? 'visible' : 'hidden'}`} 
                        alt="Profile Light" 
                    />
                    <img 
                        src="Me.jpg" 
                        className={`avatar-asset ${avatarState === 'dark' ? 'visible' : 'hidden'}`} 
                        alt="Profile Dark" 
                    />
                    <video
                        ref={toDarkVideoRef}
                        src=""
                        className={`avatar-asset video-asset ${avatarState === 'to-dark' ? 'visible' : 'hidden'}`}
                        muted playsInline onEnded={() => setAvatarState('dark')}
                    />
                    <video
                        ref={toLightVideoRef}
                        src=""
                        className={`avatar-asset video-asset ${avatarState === 'to-light' ? 'visible' : 'hidden'}`}
                        muted playsInline onEnded={() => setAvatarState('light')}
                    /> */}
                </div>
                {/* ========================================= */}

                <div className="profile-info">
                    <div className="profile-top-row">
                        <div className="name-group">
                            <h1>
                                John Angelo Concepcion
                                <i className="fa-solid fa-circle-check verified-icon"></i>
                            </h1>
                            <p className="profile-location">
                                <i className="fa-solid fa-location-dot"></i> Manila, Philippines
                            </p>
                            <p className="profile-title">Software Engineer \ Computer Engineer</p>
                        </div>

                       {/* Light/dark toggle top-right (Sliding Switch) */}
                        <button className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleTheme} aria-label="Toggle theme">
                            <div className="theme-track">
                                <div className="theme-thumb">
                                    <i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Champion badge — links to Facebook post */}
                    <div className="badge-row">
                        <a
                            href="https://www.facebook.com/share/p/17ud3a6m6D/?mibextid=wwXIfr"
                            target="_blank" rel="noreferrer"
                            className="champion-badge"
                        >
                            <i className="fa-solid fa-trophy"></i>
                            Ideathon 2025 Finalist
                            <i className="fa-solid fa-chevron-right badge-arrow"></i>
                        </a>
                    </div>

                    {/* CTA buttons */}
                    <div className="profile-actions">
                        <a href="mailto:johnangeloconcepcion8@gmail.com" className="btn-primary">
                            <i className="fa-regular fa-envelope"></i> Send Email
                        </a>
                        <a
                            href="https://www.linkedin.com/in/john-angelo-concepcion-09051b381"
                            target="_blank" rel="noreferrer"
                            className="btn-secondary"
                        >
                            <i className="fa-brands fa-linkedin"></i> LinkedIn
                        </a>
                      
                    </div>
                </div>
            </header>

            <hr className="section-divider" />

{/* ===================== TWO-COLUMN BODY ===================== */}
            {!activeProjectPage && (
                <div className="two-col-layout">

                    {/* ——— LEFT COLUMN ——— */}
                    <div className="left-col">

                        {/* ABOUT */}
                        <section className="content-section">
                            <h2 className="section-title">About</h2>
                            <p>As a dedicated Computer Engineer, I have cultivated a rigorous foundation in system integration, embedded systems, and complex problem-solving. My academic and practical experiences have equipped me with the analytical mindset necessary to design efficiently.</p>
                            <p>Building upon this solid engineering background, I am highly motivated to master the complete lifecycle of full-stack software development. I am actively expanding my technical expertise across both client-side interfaces and server-side architectures.</p>
                            <p>Currently, my primary focus and passion are directed toward advanced backend engineering, specifically utilizing PHP and the robust Laravel framework. I am deeply committed to leveraging these technologies to architect scalable, secure, and high-performance web applications.</p>
                        </section>

                        <hr className="section-divider" />

                        {/* TECH STACK */}
                        <section className="content-section">
                            <div className="section-header-row">
                                <h2 className="section-title">Tech Stack</h2>
                            </div>
                            <div className="stack-group">
                                <h3 className="stack-label">Frontend</h3>
                                <div className="stack-pills">
                                    <span>React</span><span>JavaScript</span>
                                    <span>Flutter</span><span>React Native</span>
                                </div>
                            </div>
                            <div className="stack-group">
                                <h3 className="stack-label">Backend</h3>
                                <div className="stack-pills">
                                    <span>PHP</span><span>Laravel</span>
                                    <span>Node.js</span><span>Java</span>
                                </div>
                            </div>
                            <div className="stack-group">
                                <h3 className="stack-label">DevOps & Cloud</h3>
                                <div className="stack-pills">
                                    <span>GitHub</span>
                                    <span>Firebase</span><span>MySQL</span>
                                </div>
                            </div>

                        </section>

                        <hr className="section-divider" />

{/* RECENT PROJECTS */}
                        <section className="content-section">
                            <div className="section-header-row">
                                <h2 className="section-title">Recent Projects</h2>
                            </div>

                            <div className="projects-grid">
                                {PROJECTS_DATA.map((project) => (
                                    <div key={project.id} className="project-card">
                                        <h3>{project.title}</h3>
                                        <p>{project.shortDesc}</p>

                                        {/* Triggers the dedicated individual page */}
                                        <button
                                            className="see-more-btn"
                                            onClick={() => setActiveProjectPage(project)}
                                        >
                                            See more <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div> {/* <--- Closes left-col */}

                    {/* ——— RIGHT SIDEBAR ——— */}
                    {/* ... (Keep your existing identity-card and experience sidebar here) ... */}
                    <div className="right-col">
                        <div className="identity-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={cardStyle}>
                            <div className="id-card-top"></div>
                            <div className="id-card-middle">
                                <p className="id-org">COMPUTER ENGINEER</p>
                                <p className="id-type">CPE PORTFOLIO CARD</p>
                            </div>
                            <div className="id-card-bottom">
                                <p className="id-member-label">IDEATHON FINALIST</p>
                                <p className="id-name">ANGELO</p>
                                <div className="id-card-row">
                                    <p className="id-role">SOFTWARE ENGINEER</p>
                                    <div className="id-qr">
                                        <i className="fa-solid fa-qrcode"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="sidebar-section">
                            <h2 className="section-title">Experience</h2>
                            <div className="exp-list">
                                <div className="exp-row">
                                    <div className="exp-box"></div>
                                    <div className="exp-info">
                                        <div className="exp-top-row">
                                            <strong>Hardware Design & Algorithm</strong>
                                            <span className="exp-yr">2026</span>
                                        </div>
                                        <p className="exp-company">CPE Design Project Thesis</p>
                                    </div>
                                </div>
                                <div className="exp-row">
                                    <div className="exp-box"></div>
                                    <div className="exp-info">
                                        <div className="exp-top-row">
                                            <strong>Software & Hardware Lead</strong>
                                            <span className="exp-yr">2025</span>
                                        </div>
                                        <p className="exp-company">Airlink Defense System</p>
                                    </div>
                                </div>
                                <div className="exp-row">
                                    <div className="exp-box"></div>
                                    <div className="exp-info">
                                        <div className="exp-top-row">
                                            <strong>Project Manager</strong>
                                            <span className="exp-yr">2022</span>
                                        </div>
                                        <p className="exp-company">Red Cross Software System</p>
                                    </div>
                                </div>
                                <div className="exp-row">
                                    <div className="exp-box"></div>
                                    <div className="exp-info">
                                        <div className="exp-top-row">
                                            <strong>BS Computer Engineering</strong>
                                            <span className="exp-yr">2021</span>
                                        </div>
                                        <p className="exp-company">University — Manila</p>
                                    </div>
                                </div>
                                <div className="exp-row">
                                    <div className="exp-box"></div>
                                    <div className="exp-info">
                                        <div className="exp-top-row">
                                            <strong>Hello World! 👋</strong>
                                            <span className="exp-yr">2021</span>
                                        </div>
                                        <p className="exp-company">Wrote my first line of code</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> /* <--- Closes two-col-layout */
            )}

            {/* ===================== INDIVIDUAL PROJECT PAGE OVERLAY ===================== */}
            {activeProjectPage && (
                <div className="project-detail-page">
                    {/* Sticky Header with Back Button */}
                    <div className="project-page-header">
                        <button className="back-btn" onClick={() => setActiveProjectPage(null)}>
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </button>
                    </div>
                    
                    <div className="project-page-content">
                        {/* Huge Hero Title */}
                        <h1>{activeProjectPage.title}</h1>
                        <div className="project-chip page-chip">{activeProjectPage.id} · Case Study</div>
                        
                        {/* Two Column Layout for the specific project */}
{/* Two Column Layout for the specific project */}
                        <div className="project-page-body">
                            
                            {/* Left Side: Long Description & Inline Images */}
                            <div className="project-main-desc">
                                <h3>About the Project</h3>
                                <p>{activeProjectPage.fullDesc}</p>
                                
                                {/* NEW: Render images directly on the page here */}
                                {activeProjectPage.credentials && activeProjectPage.credentials.some(cred => cred.type === 'image') && (
                                    <div className="case-study-gallery">
                                        {activeProjectPage.credentials
                                            .filter(cred => cred.type === 'image')
                                            .map((img, index) => (
                                                <div key={index} className="case-study-image-wrapper">
                                                    <img src={img.src} alt={img.label} className="case-study-image" />
                                                    <span className="image-caption">{img.label}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Hardware & PDF Credentials */}
                            <div className="project-sidebar">
                                {activeProjectPage.hardware && activeProjectPage.hardware.length > 0 && (
                                    <div className="page-section">
                                        <h4>Hardware & Tech Stack</h4>
                                        <ul className="hardware-list">
                                            {activeProjectPage.hardware.map((item, index) => (
                                                <li key={index}><i className="fa-solid fa-microchip"></i> {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* ONLY render this section if there is a PDF document */}
                                {activeProjectPage.credentials && activeProjectPage.credentials.some(cred => cred.type === 'pdf') && (
                                    <div className="page-section mt-4">
                                        <h4>Project Documents</h4>
                                        <div className="credentials-container page-credentials">
                                            {activeProjectPage.credentials
                                                .filter(cred => cred.type === 'pdf')
                                                .map((cred, index) => (
                                                    <div key={index} className="credential-asset-card">
                                                        <div className="asset-icon">
                                                            <i className="fa-regular fa-file-pdf pdf-color"></i>
                                                        </div>
                                                        <div className="asset-info">
                                                            <span>{cred.label}</span>
                                                            <a href={cred.src} target="_blank" rel="noopener noreferrer" className="asset-view-link">
                                                                Open Document <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {/* ========================================================================= */}

            <hr className="section-divider" />

            {/* ===================== GALLERY (full width) ===================== */}
            <section className="content-section full-width-section">
                <div className="section-header-row">
                    <h2 className="section-title">Gallery</h2>
                    <div className="gallery-controls">
                        <button className="gal-btn" onClick={() => scrollGallery('prev')}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button className="gal-btn" onClick={() => scrollGallery('next')}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="gallery-slider" ref={galleryRef}>
                    <img src="/Gallery1.png" alt="Project 1" onClick={() => setActiveProjectImage('/Gallery1.png')} />
                    <img src="/Gallery2.png" alt="Project 2" onClick={() => setActiveProjectImage('/Gallery2.png')} />
                    <img src="/Gallery3.png" alt="Project 3" onClick={() => setActiveProjectImage('/Gallery3.png')} />
                    <img src="/Gallery4.png" alt="Project 4" onClick={() => setActiveProjectImage('/Gallery4.png')} />
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===================== FOOTER ===================== */}
            <footer className="site-footer">
                <div className="footer-col">
                    <h4>Social Links</h4>
                    <a href="https://www.linkedin.com/in/john-angelo-concepcion-09051b381" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i> LinkedIn
                    </a>
                    <a href="mailto:johnangeloconcepcion8@gmail.com">
                        <i className="fa-solid fa-envelope"></i> Email
                    </a>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    <p>johnangeloconcepcion8<br />@gmail.com</p>
                </div>
                <div className="footer-col">
                    <h4>Speaking</h4>
                    <p>Available for talks on IoT, embedded systems, and full-stack engineering.</p>
                </div>
                <div className="footer-col">
                    <h4>© 2026</h4>
                    <p>John Angelo Concepcion.<br />All rights reserved.</p>
                </div>
            </footer>

            {/* ===================== CHATBOT ===================== */}
            {isChatOpen && (
                <div className="chat-container" style={{ display: 'flex' }}>
                    <div className="chat-header">
                        <div className="chat-title">
                            <i className="fa-solid fa-robot"></i> Chat with Angelo
                        </div>
                        <button className="close-chat" onClick={() => setIsChatOpen(false)}>&times;</button>
                    </div>
                    <div className="chat-body" ref={chatBodyRef}>
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                        />
                        <button onClick={() => handleSendMessage()} disabled={isLoading}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
            {!isChatOpen && (
                <button className="chatbot-fab" onClick={() => setIsChatOpen(true)}>
                    <i className="fa-solid fa-comment-dots"></i> Chat with Angelo
                </button>
            )}

            {/* ===================== IMAGE MODAL ===================== */}
            {activeProjectImage && (
                <div className="image-modal-overlay" onClick={() => setActiveProjectImage(null)}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setActiveProjectImage(null)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img src={activeProjectImage} alt="Project Preview" />
                    </div>
                </div>
            )}
        </div> /* <-- This is the final closing div of your portfolio */
    );
}