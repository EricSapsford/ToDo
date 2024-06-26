import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {


  return (
    <>
      <div id="footer">
        {/* <h1>footer</h1> */}
        <div id='footer-col-1'>
          <Link exact to="/projects">
            <div id='footer-logo-text'>
              DueToo
            </div>
          </Link>
          <div id='footer-copyright'>
            @ 2024 Due Too
          </div>
        </div>
        <div className='footer-right'>
          <div className='footer-row'>
            <div className='footer-right-header'>Features</div>
            <div className='footer-list'>
                <div>Projects</div>
                <div>Sections</div>
                <div>Tasks</div>
                <div>Drag 'n Drop</div>


            </div>
          </div>
          <div id='footer-col'>
            <div className='footer-left-header'>Contact Me</div>
              <div className='footer-name'>
              <a href="https://ericsapsford.com" target="_blank" rel="noopener noreferrer">
                  <div>Eric Sapsford</div>
                </a>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/eric-sapsford-a2605b298/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/EricSapsford" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className='header-footer-placeholder'>
        <a href='google.com'></a>
        <nav></nav>
      </div>
    </>
  )
};
