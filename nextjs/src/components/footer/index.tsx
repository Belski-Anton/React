import './style.css'
import Image from "next/image";
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
             <Image
              src="/assets/link.png"
              alt="link"
              height={16}
              width={16}
             />
           </a>
       </div>
   )
}
export default Footer