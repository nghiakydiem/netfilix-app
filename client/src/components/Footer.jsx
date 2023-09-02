import "../css/Footer.css";
import { Link } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { BsFillCaretDownFill } from "react-icons/bs";
import Motion from "./Motion";

export default function Footer() {
  return (  
    <Motion variantsOption="bottomToTop">
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__heading">
            <Link href="https://help.netflix.com/vi/contactus">
              Questions? Contact us.
            </Link>
          </div>
          <div className="footer__content">
            <ul className="footer__content-list">
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/vi/node/412">FAQ</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/vi/">Help Center</Link>
              </li>
              <li className="footer__content-item">
                <Link href="/singin">Account</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://media.netflix.com/en/">Media Center</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://ir.netflix.net/ir-overview/profile/default.aspx">
                  Investor Relations
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://jobs.netflix.com/">Jobs</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://devices.netflix.com/en/">
                  Ways to watch
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/legal/termsofuse">
                  Terms of Use
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/legal/privacy">
                  Privacy
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="/">Cookie Preferences</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/legal/corpinfo">
                  Corporate Information
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/vi/contactus">
                  Contact Us
                </Link>
              </li>
              <li className="footer__content-item">
                <Link to="http://fast.com">Speed test</Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://help.netflix.com/legal/notices">
                  Legal Notices
                </Link>
              </li>
              <li className="footer__content-item">
                <Link href="https://www.netflix.com/vn-en/browse/genre/839338">
                  Only on Netflix
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__language">
            <div className="footer__language-content">
              <select>
                <option>English</option>
                <option>Tiếng Việt</option>
              </select>
              <MdLanguage className="footer__language-icon" />
              <BsFillCaretDownFill className="footer__down-icon" />
            </div>
          </div>
          <p>Netflix Vietnam</p>
        </div>
      </footer>
    </Motion>
  );
}
