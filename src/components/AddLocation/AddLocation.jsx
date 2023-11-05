import { Button, Group, Select, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";
import useCountries from "../../hooks/useCountries";
import { useForm } from "@mantine/form";
import Map from "../Map/Map";

export default function AddLocation({
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) {
  const { getAll } = useCountries();

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    // console.log(hasErrors,"location");
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          gap: "3rem",
          marginTop: "3rem",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        {/* left side */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label={"Country"}
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          ></Select>
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>
        {/* right side */}
        <div style={{ flex: 1 }}>
          <Map address={address} country={country} city={city} />
        </div>
      </div>

      <Group justify="center" mt={"xl"}>
        <Button type="submit">Next</Button>
      </Group>
    </form>
  );
}
