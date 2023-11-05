import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser, getallBookings, getallfav } from "../../utils/api";
// import useFavourites from "../../hooks/useFavourites";

export default function Layout() {
  // useFavourites();
  // useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);


  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email),
  });

  useEffect(() => {
    // const getTokenAndRegsiter = async () => {
    //   const res = await getAccessTokenWithPopup({
    //     authorizationParams: {
    //       audience: "http://localhost:8000",
    //       scope: "openid profile email",
    //     },
    //   });
    //   localStorage.setItem("access_token", res);
    //   setUserDetails((prev) => ({ ...prev, token: res }));
    //   console.log(res);
    //   mutate(res);
    // };

    const getSync = async () => {
      const data = await getallBookings(user?.email);
      const like = await getallfav(user?.email);
      // console.log(data.bookedVisits);
      // console.log(like, "layout");
      setUserDetails((prev) => ({
        ...prev,
        bookings: [...data.bookedVisits],
        favourites: [...like.favResidenciesID],
      }));
      // console.log(userDetails);
    };
    isAuthenticated && getSync();
    isAuthenticated && mutate();
  }, [isAuthenticated]);

  return (
    <>
      <div
        style={{
          background: "var(--black)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Header style={{ position: "relative" }} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
