import { useContext, useState } from "react";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "../Properties/Properties.scss";
import UserDetailContext from "../../context/UserDetailContext";

export default function Favourites() {
  const { data, isError, isLoading } = useProperties();
  const [filter, setfilter] = useState("");

  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the data</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // console.log(data);
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setfilter={setfilter} />
        <div className="paddings flexCenter properties">
          {data
            .filter((property) => favourites.includes(property.id))
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase()) ||
                property.address.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
