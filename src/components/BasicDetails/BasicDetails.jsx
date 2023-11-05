import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Box, Button, Group, NumberInput, TextInput, Textarea } from "@mantine/core";


export default function BasicDetails({
  nextStep,
  propertyDetails,
  setPropertyDetails,
  prevStep,
}) {

    const form = useForm({
        initialValues:{
            title: propertyDetails.title,
            description: propertyDetails.description,
            price: propertyDetails.price,
        },
        validate:{
            title:(value) => validateString(value),
            description:(value) => validateString(value),
            price:(value) => value < 1000 ? "Must be greater than 999 dollars" : null,
        },
    })

    const {title,description,price} = form.values;

    const handleSubmit= () => {
        const {hasErrors} = form.validate()
        if(!hasErrors){
            let price2 = parseInt(price,10);
            // console.log(typeof price2, "basic details");
            setPropertyDetails((prev)=>({...prev,title,description,price:price2}))
            nextStep()
        }
    }

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="$ #,###"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group justify="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next
          </Button>
        </Group>
      </form>
    </Box>
  );
}