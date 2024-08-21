

import React, { useState } from 'react';
import '../../style/ContactUs.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFocus = (e) => {
        const parent = e.target.parentNode;
        parent.classList.add('focus');
    };

    const handleBlur = (e) => {
        const parent = e.target.parentNode;
        if (e.target.value === '') {
            parent.classList.remove('focus');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: '3aa3d677-af03-40fc-84ed-ab60e3213974', 
                    ...formData,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container">
            <span className="big-circle"></span>
            <img src="img/shape.png" className="square" alt="" />
            <div className="form">
                <div className="contact-info">
                    <h3 className="title">Let's get in touch</h3>
                    <p className="text">
                        Please feel free to contact us for any query, concern, suggestion, or just about anything to do with us.
                    </p>

                    <div className="info">
                        <div className="information">
                            <i className="fas fa-map-marker-alt"></i> &nbsp;&nbsp;
                            <p>CDAC KHARGHAR ,MUMBAI-41515</p>
                        </div>
                        <div className="information">
                            <i className="fas fa-envelope"></i> &nbsp;&nbsp;
                            <p>fashionflare592@gmail.com</p>
                        </div>
                        <div className="information">
                            <i className="fas fa-phone"></i>&nbsp;&nbsp;
                            <p>7894561235</p>
                        </div>
                    </div>

                    {/* Embedded Google Map */}
                    <div className="map-container" style={{ width: '10px', height: '10px', marginTop: '20px' }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8597825275265!2d73.05167127497606!3d19.025899382168422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e0!3m2!1sen!2sin!4v1723646886353!5m2!1sen!2sin" 
                     allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <span className="circle one"></span>
                    <span className="circle two"></span>

                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h3 className="title">Contact us</h3>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                className="input"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            <label htmlFor="name">Username</label>
                            <span>Username</span>
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                className="input"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            <label htmlFor="email">Email</label>
                            <span>Email</span>
                        </div>
                        <div className="input-container">
                            <input
                                type="tel"
                                name="phone"
                                className="input"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            <label htmlFor="phone">Phone</label>
                            <span>Phone</span>
                        </div>
                        <div className="input-container textarea">
                            <textarea
                                name="message"
                                className="input"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            ></textarea>
                            <label htmlFor="message">Message</label>
                            <span>Message</span>
                        </div>
                        <input type="submit" value={isSubmitting ? "Sending..." : "Send"} className="btn" disabled={isSubmitting} />
                    </form>
                    {isSuccess && <p className="success-message">Message sent successfully!</p>}
                    {isError && <p className="error-message">Failed to send the message. Please try again later.</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
