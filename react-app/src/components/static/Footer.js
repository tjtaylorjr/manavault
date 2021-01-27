import React from 'react';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { profileLinks } from './Config';

const MainFooter = () => {
    const { angel, linkedin, github, email } = profileLinks;
    return (
        <div className="footer">
          <footer>
              <a href={github} >
                  <FaGithub className="footer__icons" />
              </a>
              <a href={linkedin} >
                  <FaLinkedin className="footer__icons" />
              </a>
              <span className="footer__text">Created by TJ Taylor ©2021</span>
              <a href={angel} >
                  <FaAngellist className="footer__icons" />
              </a>
              <a href={`mailto:${email}`}>
                  <FaEnvelope className="footer__icons" />
              </a>
          </footer>

        </div>

    )
};
export default MainFooter;
