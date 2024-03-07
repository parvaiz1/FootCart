import React from 'react'
import './footer.css'

function Footer() {
  return (
    <>
      <div className='footerWraper'>
        <div className="footer">

          <div className="top">
            <div style={{ width: "50%" }} >
              <p className='footCart'>Food Cart</p>
              <p  className='AddYour'>Add your fourite food in next meal</p>
            </div>
            <div className='brands'>
              <a title='Parvaiz Mahroo' href="https://www.facebook.com/parvaiz.mahroo.9?mibextid=ZbWKwL" target='_blank'> <i className='fa-brands fa-facebook-square'></i> </a>
              <a title='Parvaiz Mahroo' href="https://www.instagram.com/parvaiz_mahroo/" target='_blank'> <i className='fa-brands fa-instagram-square'></i> </a>
              <a title='Parvaiz Mahroo' href="https://twitter.com/?lang=en" target='_blank'> <i className='fa-brands fa-twitter-square'></i> </a>
            </div>
          </div>

          <div className='Bottom'>
            <div>
              <h4> Project</h4>
              <a>Status</a>
              <a>License</a>
              <a>All Versions</a>
            </div>
            <div>
              <h4> Community</h4>
              <a>Github</a>
              <a>Project</a>
              <a>Twitter</a>
            </div>
            <div>
              <h4> Help</h4>
              <a>Support</a>
              <a>Troubleshooting</a>
              <a>Contact Us</a>
            </div>
            <div>
              <h4> Others</h4>
              <a>Termis and Condition</a>
              <a>Privacy Services</a>
              <a>License </a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Footer