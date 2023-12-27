import './Footer.css';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';

function Footer() {
    const socialLinks = [
        { id: "instaIcon", icon: <AiFillInstagram />, href: "https://www.instagram.com/" }, // Replace with actual URL
        { id: "fbIcon", icon: <FaFacebook />, href: "https://www.facebook.com/" },         // Replace with actual URL
        { id: "linkedIcon", icon: <AiFillLinkedin />, href: "https://www.linkedin.com/in/" }
    ];

    return (
        <footer>
            <div className="container">
                <ul className="connections">
                    {socialLinks.map(link => (
                        <li key={link.id}>
                            <a href={link.href} target="_blank" rel="noreferrer" id={link.id}>
                                {link.icon}
                            </a>
                        </li>
                    ))}
                </ul>
                <p>
                    All Rights Reserved &copy; 2022 &#8226;
                    <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
