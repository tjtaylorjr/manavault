import React from 'react';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { profileLinks } from './Config';

const MainFooter = () => {
    const { angel, linkedin, github, email } = profileLinks;

    const footer_gradient = (
        <svg width="0" height="0">
            <linearGradient id="footer_gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#766237" offset="0%" />
                <stop stopColor="#E6CD8C" offset="50%" />
                <stop stopColor="#766237"
                offset="100%" />
            </linearGradient>
        </svg>
    )
    return (
        <div className="footer">
          {footer_gradient}
          <footer>
            <a href={github} >
              <FaGithub className="footer__icons" style={{fill: "url(#footer_gradient)" }} />
            </a>
            <a href={linkedin} >
                    <FaLinkedin className="footer__icons" style={{ fill: "url(#footer_gradient)" }} />
            </a>
            <span className="footer__text">Created by TJ Taylor ©2021</span>
            <a href={angel} >
                    <FaAngellist className="footer__icons" style={{ fill: "url(#footer_gradient)" }} />
            </a>
            <a href={`mailto:${email}`}>
                    <FaEnvelope className="footer__icons" style={{ fill: "url(#footer_gradient)" }} />
            </a>
          </footer>
        </div>
    )
};
export default MainFooter;
