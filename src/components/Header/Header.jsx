import { useState } from "react";
import "./Header.scss";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

export default function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth < 768) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src="./logo.png" alt="logo" width={100} />

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
            <a href="">Residencies</a>
            <a href="">Our Value</a>
            <a href="">Get Started</a>
            <a href="">Contact Us</a>
            <button className="button">
              <a href="">Contact</a>
            </button>
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
