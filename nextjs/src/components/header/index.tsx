import'./style.css' 
import Image from "next/image";
const Header = () => {
  return (
    <header>
      <h1 className="title">
        <Image
          src="/assets/logonterpol.png"
          alt="logo"
          height={275}
          width={183}
          style={{
            objectFit:'cover'
          }}
        />
        <div className="textTitle">
          View and search public Red Notices for wanted persons
        </div>
      </h1>
    </header>
  );
};

export default Header;
