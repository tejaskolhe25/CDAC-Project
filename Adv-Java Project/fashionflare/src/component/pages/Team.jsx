import React from 'react';
import '../../style/Team.css'; 

const Team = () => {
  const teamMembers = [
    { name: 'Arusa Korse', photo: 'arusa.jpg', facebook: '#', twitter: '#', linkedin: '#' },
    { name: 'Tejas Kolhe', photo: 'Tejas Kolhe.jpg', facebook: '#', twitter: '#', linkedin: '#' },
    { name: 'Shreyash Bhagat', photo: 'shreyash.jpg', facebook: '#', twitter: '#', linkedin: '#' },
    { name: 'Shraddha Rathi', photo: 'shraddha.jpg', facebook: '#', twitter: '#', linkedin: '#' },
    { name: 'Swapnali Patil', photo: 'swapnali.jpg', facebook: '#', twitter: '#', linkedin: '#' }
  ];

  return (
    <div className="team-container">
      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.photo} alt={member.name} className="team-photo" />
            <h2 className="team-name">{member.name}</h2>
            <p className="team-role">Developer</p>
            <div className="social-links">
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="fab fa-facebook-f" aria-hidden="true"></a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="fab fa-twitter" aria-hidden="true"></a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="fab fa-linkedin-in" aria-hidden="true"></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
