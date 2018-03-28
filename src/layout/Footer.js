import React from 'react';

const Footer = () => (
  <footer className="footer text-center">   
      <div className="drygoncontainer justify-content-center">      
        <h4>Get in touch</h4>
         <ul className="contact container-fluid">
          <li><a target="_blank" href="https://www.linkedin.com/in/tony-yep-721b2337/"><i className="fa fa-linkedin fa-lg fa-border"/>
          </a></li>
          <li><a target="_blank" href="http://www.youtube.com/channel/UCS-pKWWh_L7wYn8U6nz-zhA"><i className="fa fa-youtube fa-lg fa-border" />
          </a></li>
        </ul>      
      </div>
      <div className="copyright">
        <ul>
          <li>&copy; Copyright 2017 Drygon Consulting Inc. All rights reserved</li>
          <li>Design & Program By: <a target="_blank" href="https://zihuijie.github.io/">
            <span>Hui Jie Zi-Yep</span>
          </a></li>
        </ul>
      </div>   
  </footer>
)

export default Footer;