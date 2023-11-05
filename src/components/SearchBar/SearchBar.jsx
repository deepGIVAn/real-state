import { HiLocationMarker } from "react-icons/hi";
import "./SearchBar.scss";

export default function SearchBar({filter,setfilter}) {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker size={25} color="var(--blue)" />
      <input type="text" value={filter} onChange={(e)=>setfilter(e.target.value)} placeholder="Search by title/city/country.." />
      <button className="button">Search</button>
    </div>
  );
}
