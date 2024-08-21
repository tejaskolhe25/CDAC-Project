import React from 'react';
import '../../style/aboutUs.css'; // Optional: Create this CSS file for styling

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h2>About Us</h2>
            <p>Welcome to Fashion Flare, where tradition meets elegance. We are passionate about bringing you the finest sarees that celebrate the rich cultural heritage of India. Our journey began with a vision to make sarees accessible to every woman who appreciates the grace and beauty of this timeless attire.</p>

            <h3>Our Story</h3>
            <p>
                Founded in 2024, Fashion Flare was born out of a love for sarees and a desire to share this love with the world. From humble beginnings to becoming a trusted name in saree fashion, our journey has been one of dedication, craftsmanship, and a commitment to quality. 
                Every saree in our collection is a testament to the skills of our artisans and the rich traditions they uphold.
            </p>

            <h3>Our Collection</h3>
            <p>
                At Fashion Flare, we take pride in offering a diverse collection of sarees that cater to every occasion and style. 
                Whether you're looking for a classic Banarasi silk or a contemporary chiffon, our collection is curated with care to ensure that you find the perfect saree for your needs. 
                Each saree is crafted with precision, using the finest materials and techniques passed down through generations.
            </p>

            <h3>Our Mission</h3>
            <p>
                Our mission is to preserve and promote the cultural heritage of sarees while empowering the artisans who bring these beautiful pieces to life. 
                We believe in sustainable fashion and are committed to ethical practices that benefit both our customers and our artisans.
            </p>

            <h3>Customer Experience</h3>
            <p>
                We are dedicated to providing an exceptional shopping experience for our customers. 
                From easy returns to personalized styling advice, we are here to ensure that your journey with Fashion Flare is as seamless and enjoyable as possible. 
                But don't just take our word for it – our customers' glowing reviews speak for themselves.
            </p>

            <h3>Looking Forward</h3>
            <p>
                As we continue to grow, our goal is to expand our collection and reach saree lovers across the globe. 
                We invite you to join us on this journey, whether by shopping our collection, following us on social media, or simply sharing your love for sarees with others.
            </p>

            <p>Thank you for being a part of the Fashion Flare family.</p>

            <div className="cards-container">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1630880276407-7e0c38d4df24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHNhcmVlJTIwcGhvdG9zfGVufDB8fDB8fHww" alt="Saree Crafting" />
                    <h4>Saree Crafting</h4>
                    <p>Discover the intricate process behind each of our sarees.</p>
                </div>
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1692850852630-495a2145c2a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhcmVlJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D" alt="Our Artisans" />
                    <h4>Our Artisans</h4>
                    <p>Meet the talented artisans who bring our sarees to life.</p>
                </div>
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1551891909-9f838bb7de03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNhcmVlJTIwcGhvdG9zfGVufDB8fDB8fHww" alt="Sustainable Fashion" />
                    <h4>Sustainable Fashion</h4>
                    <p>Learn about our commitment to sustainable and ethical fashion.</p>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;
