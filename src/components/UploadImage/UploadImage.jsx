import { useEffect, useRef, useState } from "react";
import {AiOutlineCloudUpload} from "react-icons/ai";
import "./UploadImage.scss";
import { Button, Group } from "@mantine/core";

export default function UploadImage({
  nextStep,
  propertyDetails,
  setPropertyDetails,
  prevStep,
}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current?.createUploadWidget({
          cloudName: "dvpmplzph",
          uploadPreset: "aowweqxp",
          maxFiles: 1,
        },(err,result)=>{
            if(result.event === "success") {
                // console.log(result,"Image");
                setImageUrl(result.info.secure_url)
            }
        });
    },[])

    const [imageUrl, setImageUrl] = useState(propertyDetails.image);

    const handleNext = () => {
        setPropertyDetails((prev)=> ({...prev, image:imageUrl}))
        nextStep();
    }

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageUrl ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageUrl} alt="image" />
        </div>
      )}

      <Group justify="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={handleNext} disabled={!imageUrl}>Next</Button>
      </Group>
    </div>
  );
}
