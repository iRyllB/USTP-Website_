import React, { useEffect, useState, useRef } from 'react';
import NavigationBar from "../components/navBar";
import Footer from "../components/footer";
import './home.css';
import './main.css'
import About from '../assets/sample.png';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSpring, animated, config } from 'react-spring';

export default function Home() {
    const [showPageContent, setShowPageContent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    // Create a ref for scrolling to content
    const contentRef = useRef(null);
    
    // Check if mobile on initial load and window resize
    useEffect(() => {
        const checkIsMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            // Show content immediately on mobile
            if (mobile && !showPageContent) {
                setShowPageContent(true);
            }
            
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        // Initial check
        checkIsMobile();
        
        // Add resize listener for mobile device
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, [showPageContent]);
    
    useEffect(() => {
        AOS.init();
    }, []);
    
    // Content reveal spring animation
    const contentProps = useSpring({
        opacity: showPageContent ? 1 : 0,
        transform: showPageContent ? 'translateY(0)' : 'translateY(20px)',
        config: { tension: 280, friction: 60 }
    });

    const handleLearnMore = () => {
        // Show the rest of the page content
        setShowPageContent(true);
        
        // Scroll to the content section after a small delay
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
            <NavigationBar />
            <main>
                {/* Hero Section (always visible) */}
                <header className="banner">
                    {/* Colored circles */}
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <div className="circle circle3"></div>
                    <div className="circle circle4"></div>
                    
                    {/* Gray accent circles */}
                    <div className="gray-circle gray-circle1"></div>
                    <div className="gray-circle gray-circle2"></div>
                    <div className="gray-circle gray-circle3"></div>
                    
                    <div className="banner-content">
                        <h1 className="banner-title">
                            Building Good Things, <span className="color-text">Together!</span>
                        </h1>
                        <p>
                            Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        {!isMobile && (
                            <button 
                                className="banner-button" 
                                onClick={handleLearnMore}
                            >
                                Learn More
                            </button>
                        )}
                    </div>
                </header>

                {/* Page content (revealed after clicking Learn More on desktop, or visible immediately on mobile) */}
                <animated.div 
                    style={{
                        ...contentProps,
                        display: !showPageContent && !isMobile ? 'none' : 'block',
                        position: !showPageContent && !isMobile ? 'absolute' : 'relative',
                        visibility: !showPageContent && !isMobile ? 'hidden' : 'visible'
                    }} 
                    ref={contentRef}
                >
                    <section className="section-1">
                        <div className="section-1-container">
                            <div className="home-info-group top-group">
                                <div className="home-image-box left-image" style={{ 
                                    backgroundImage: `url(${About})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <img 
                                        src={About} 
                                        alt="About us" 
                                        style={{ 
                                            width: '1px', 
                                            height: '1px', 
                                            opacity: 0 
                                        }} 
                                    />
                                </div>
                                <div className="home-text-container">
                                    <h2 className="home-info-title">Lorem ipsum dolor sit amet</h2>
                                    <p className="home-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
                                    <Link to="/aboutus" style={{ textDecoration: 'none' }}>
                                        <button className="home-learn-more-button">
                                            <span className="home-learn-more-text">Learn More</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="home-info-group bottom-group">
                                <div className="home-text-container right-aligned">
                                    <h2 className="home-info-title">Lorem ipsum dolor sit amet</h2>
                                    <p className="home-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
                                </div>
                                <div className="home-image-box right-image" style={{ 
                                    backgroundImage: `url(${About})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <img 
                                        src={About} 
                                        alt="About us" 
                                        style={{ 
                                            width: '1px', 
                                            height: '1px', 
                                            opacity: 0 
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="gallery" data-aos="fade-up">
                        <h1>Inspiring Members</h1>
                        <div className="gallery-container">
                        <div className="text-content">
                            <div className="quote">"GDSC revolutionized the way I work with its innovative and user-friendly products."</div>
                            <div className="reviewer">- Some Random Review</div>
                            <a href="#" className="cta-link">See More of Stranger's Story →</a>
                            </div>
                        </div>
                    </section>

                    <section className="wtsup-wrapper">
                        <div className="wtsup-section">
                            <h1 className="wtsup-heading">What's Up?</h1>
                            <div className="wtsup-container">
                                <div className="wtsup-card">
                                    <img src={About} alt="Silhouette" className="wtsup-image" />
                                    <h2 className="wtsup-title">Lorem ipsum dolor sit amet</h2>
                                    <p className="wtsup-time">An hour ago</p>
                                    <p className="wtsup-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                    </p>
                                </div>
                                <div className="wtsup-card">
                                    <img src={About} alt="Night sky" className="wtsup-image" />
                                    <h2 className="wtsup-title">Lorem ipsum dolor sit amet</h2>
                                    <p className="wtsup-time">An hour ago</p>
                                    <p className="wtsup-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                    </p>
                                </div>
                            </div>
                            <div className="wtsup-button-container">
                                <button className="wtsup-button">Show More ↓</button>
                            </div>
                        </div>
                    </section>

                    <section className="cta" data-aos="fade-up">
                        <h1>CTA</h1>
                    </section>
                </animated.div>
            </main>
            {(showPageContent || isMobile) && <Footer />}
        </>
    );
}
