import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import "./Property.scss";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import { useContext, useState } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

export default function Property() {
  //   const { pathname } = useLocation(); // in react-router-dom okk...
  //   console.log(pathname.split("/").slice(-1)[0]);
  const { propertyId } = useParams();
  const { data, isError, isLoading } = useQuery(["resd", propertyId], () =>
    getProperty(propertyId)
  );

  const { user } = useAuth0();

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const {
    userDetails: { bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(propertyId, user?.email),
    onSuccess:()=>{
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== propertyId),
      }));

      toast.success("Booking Cancelled", {position:'top-right'})
    }
  });

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
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </div>
    );
  }

  //   console.log(data);

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={propertyId} />
        </div>
        <img src={data?.image} alt={data?.title} />
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1f3e72" />
                <span>{data?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}, {data?.city}, {data?.country}
              </span>
            </div>

            {bookings?.map((booking) => booking.id).includes(propertyId) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for &nbsp;
                  {
                    bookings?.filter((booking) => booking?.id === propertyId)[0]
                      .date
                  }
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book Your Visit
              </button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={propertyId}
              email={user?.email}
            />
          </div>
          <div className="right">
            <div className="map">
              <Map
                address={data?.address}
                city={data?.city}
                country={data?.country}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
