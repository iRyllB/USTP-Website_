import NavigationBar from "../components/navBar";
import Footer from "../components/footer";
import HeroSection from "../components/HeroSection";
import './aboutUs.css'
import { Link } from "react-router-dom";
import sampleImage1 from '../assets/sample.png';
import sampleImage2 from '../assets/sample.png';
import { useEffect } from "react";

export default function AboutUs() {
    // Force image preloading to ensure they're available
    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = sampleImage1;
        img2.src = sampleImage2;
    }, []);
    
    return (
        <>
            <title>About us</title>
            <NavigationBar />
            
            <HeroSection title="About us" theme="aboutus" />

            <section className="who-are-we-section">
                <div className="who-are-we-container">
                    <h1 className="who-are-we-title">Who Are We?</h1>
                    
                    <div className="info-group top-group">
                        <div className="image-wrapper">
                            <div className="image-box left-image" style={{ 
                                backgroundImage: `url(${sampleImage1})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                {/* This hidden image helps ensure the container has dimensions on all browsers */}
                                <img 
                                    src={sampleImage1} 
                                    alt="Coffee cup" 
                                    style={{ 
                                        width: '1px', 
                                        height: '1px', 
                                        opacity: 0 
                                    }} 
                                />
                            </div>
                        </div>
                        <div className="text-container">
                            <h2 className="info-title">Lorem ipsum dolor sit amet</h2>
                            <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
                        </div>
                    </div>
                    
                    <div className="info-group bottom-group">
                        <div className="text-container right-aligned">
                            <h2 className="info-title">Lorem ipsum dolor sit amet</h2>
                            <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
                        </div>
                        <div className="image-wrapper">
                            <div className="image-box right-image" style={{ 
                                backgroundImage: `url(${sampleImage2})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                <img 
                                    src={sampleImage2} 
                                    alt="Coffee cup" 
                                    style={{ 
                                        width: '1px', 
                                        height: '1px', 
                                        opacity: 0 
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
}