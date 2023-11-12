import './Footer.css'
import link from '../../assets/icon/link.png'
const Footer = () => {
    return (
        <div className="wrapperFooter">
            <div className="footerText">
                REST API taken from a public GitHub repository{' '}
            </div>
            <a
                href="https://github.com/bundesAPI/interpol-api"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={link} alt="link" />
            </a>
        </div>
    )
}

export default Footer
