import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useContext, useState } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function BookingModal({ opened, setOpened, propertyId, email }) {
  const [value, setValue] = useState(null);

  const { userDetails, setUserDetails } = useContext(UserDetailContext);
//   console.log(userDetails);

  const handleBookingSuccess = () => {
    toast.success("You have booked Your Visit", { position: "top-right" });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select Visit Date, click Esc to exit"
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <br />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
}
