    import React, { useEffect } from 'react';
    import NavigationBar from "../components/navBar";
    import Footer from "../components/footer";
    import './events.css'; 
    import Sample from '../assets/sample.png';

    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import { Link } from "react-router-dom";

    export default function Events() {
        useEffect(() => {
            AOS.init();
        }, []);

        return (
            <>
            
                <title>Events</title>
                <NavigationBar />
                <main>
                <section className="events">
                    
                    <h1>Events</h1>
                </section>
                <section className="section-1">
                <div className="section-1-container">
                <h1>Ongoing Events</h1>


            

            <div class="card">
            <img src={Sample}/>
            <div class="card-content">
                <h3 class="card-title">Lorem ipsum dolor sit amet</h3>
                <p class="card-registration">📅 Registration Ends at 12:00 PM</p>
                <p class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                </p>
                <a href="#" class="card-button">RSVP</a>
            </div>
        </div>

        <div class="card">
            <img src={Sample}/>
            <div class="card-content">
                <h3 class="card-title">Lorem ipsum dolor sit amet</h3>
                <p class="card-registration">📅 Registration Ends at 12:00 PM</p>
                <p class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                </p>
                <a href="#" class="card-button">RSVP</a>
            </div>
        </div>



    </div>

                {/* <div className="about-left">
                <img src={Sample}></img>
                <h2>Test</h2>
                </div> */}

                </section>
                </main>
                <Footer />
            </>
            
        );
    }
