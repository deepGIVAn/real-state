import { useState } from "react";
import "./Header.scss";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import useHeaderColor from "../../hooks/useHeaderColor";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck";

// yarn add @mantine/core @mantine/dates @mantine/form @mantine/hooks
export default function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);

  const {validateLogin} = useAuthCheck();  
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(!modalOpened);
    }
  }

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth < 768) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter paddings innerWidth h-container">
        <Link to={"/"}>
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
            <NavLink to={"/properties"}>Properties</NavLink>
            <a href="mailto:givantryto9211@gmail.com">Contact Us</a>

            {/* add property Model */}
            <div onClick={()=>handleAddPropertyClick()}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
          <div
            className="menu-icon"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </OutsideClickHandler>
      </div>
    </section>
  );
}
