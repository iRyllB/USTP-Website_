import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "../components/navBar";
import Footer from "../components/footer";
import { analyzePersonalityCode, isValidPersonalityCode } from "../lib/gemini";
import "./personalityTest.css";

export default function PersonalityTest() {
    const { id } = useParams();
    const [personalityData, setPersonalityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const analyzePersonality = async () => {
            try {
                setLoading(true);
                setError(null);

                // Validate the personality code
                if (!isValidPersonalityCode(id)) {
                    throw new Error("Invalid personality code. Please provide a valid 10-letter code.");
                }

                // Call Gemini API to analyze the personality code
                const analysis = await analyzePersonalityCode(id);
                setPersonalityData(analysis);

            } catch (err) {
                console.error("Error analyzing personality:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            analyzePersonality();
        } else {
            setError("No personality code provided");
            setLoading(false);
        }
    }, [id]);

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <>
            <title>
                {personalityData 
                    ? `${personalityData.coreType.title} - Personality Test Results` 
                    : "Personality Test Results"
                }
            </title>
            <NavigationBar />
            <main className="personality-test-page">
                {loading ? (
                    <div className="personality-loading">
                        <div className="loading-spinner"></div>
                        <p>Analyzing your personality code...</p>
                        <p className="loading-code">Code: {id?.toUpperCase()}</p>
                    </div>
                ) : error ? (
                    <div className="personality-error">
                        <h2>Unable to Analyze Personality Code</h2>
                        <p>{error}</p>
                        <div className="error-buttons">
                            <button onClick={handleRetry} className="retry-button">
                                Try Again
                            </button>
                            <Link to="/" className="back-button">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                ) : personalityData ? (
                    <div className="personality-container">
                        {/* Hero Section */}
                        <div className="personality-hero">
                            <div className="personality-hero-content">
                                <div className="personality-code-display">
                                    <span className="code-label">Your Personality Code</span>
                                    <h1 className="personality-code">{personalityData.personalityCode}</h1>
                                </div>
                                <div className="core-type-preview">
                                    <h2 className="core-type-title">{personalityData.coreType.title}</h2>
                                    <p className="core-type-summary">{personalityData.coreType.summary}</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="personality-content">
                            {/* Core Type Section */}
                            <section className="core-type-section">
                                <h3>Your Core Type</h3>
                                <div className="core-type-details">
                                    <div className="core-type-info">
                                        <h4>Strengths</h4>
                                        <ul className="strengths-list">
                                            {personalityData.coreType.strengths.map((strength, index) => (
                                                <li key={index}>{strength}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="core-type-info">
                                        <h4>Ideal Work</h4>
                                        <p>{personalityData.coreType.idealWork}</p>
                                    </div>
                                    <div className="core-type-info">
                                        <h4>Ideal Department</h4>
                                        <p className="ideal-department">{personalityData.coreType.idealDepartment}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Work Style Traits Section */}
                            <section className="work-style-section">
                                <h3>Your Work Style Traits</h3>
                                <p className="work-style-intro">Based on the last 6 letters of your code:</p>
                                <div className="work-style-grid">
                                    {Object.entries(personalityData.workStyleTraits).map(([letter, description]) => (
                                        <div key={letter} className="work-style-trait">
                                            <div className="trait-letter">{letter}</div>
                                            <div className="trait-description">{description}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Actions Section */}
                            <section className="personality-actions">
                                <div className="action-buttons">
                                    <button onClick={() => window.print()} className="print-button">
                                        Save Results
                                    </button>
                                    <Link to="/" className="home-button">
                                        Back to Home
                                    </Link>
                                </div>
                                <div className="share-section">
                                    <p>Share your personality code with friends!</p>
                                    <div className="share-code">
                                        <span>{personalityData.personalityCode}</span>
                                        <button 
                                            onClick={() => navigator.clipboard.writeText(personalityData.personalityCode)}
                                            className="copy-button"
                                        >
                                            Copy Code
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : null}
            </main>
            <Footer />
        </>
    );
}
