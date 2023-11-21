import Image from "next/image";
import Dropdown from "../dropdown";
const Search = () => {
  return (
    <div className="wrapperSelectSearch">
      <Dropdown />

      <div className="wrapperSearch">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          data-testid="search"
        />
        <Image
          className="searchImg"
          src="/assets/img/search.svg"
          alt="logo"
          height={19}
          width={20}
        />
      </div>
    </div>
  );
};

export default Search;
