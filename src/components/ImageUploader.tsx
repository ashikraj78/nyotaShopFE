import { counterStates, setFormData } from "@/redux/counterReducer";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface ImageUploaderProps {
  setImages: (images: string[]) => void;
  parentName: string;
  images: string[] | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  setImages,
  parentName,
  images,
}) => {
  const dispatch = useDispatch();
  const { formData } = useSelector(counterStates);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const [fileData, setFileData] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string[] | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleDrop = (acceptedFiles: File[]) => {
    // Convert files to their object URLs for preview
    const images = acceptedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImage(images);

    setFileData(acceptedFiles); // Store the file data in state

    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const uploadToCloudinary = async (files: File[]) => {
    const uploadedUrls = [];

    setDisableButton(true);

    // Create a promise for each file and upload it
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "jktp5k2b"); // replace with your preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/delz4didn/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        uploadedUrls.push(data?.secure_url);
        setDisableButton(false);
        return data?.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary", error);
        return null;
      }
    });

    // Wait for all uploads to finish
    const allUploadedUrls = await Promise.all(uploadPromises);

    setImageUrl(allUploadedUrls);
    setSelectedImage(null);
    images
      ? setImages([...images, ...allUploadedUrls])
      : setImages(allUploadedUrls);
    handleImageSaving(allUploadedUrls);

    return allUploadedUrls;
  };

  function handleImageSaving(allUploadedUrls: string[]) {
    if (parentName == "buyNow") {
      dispatch(
        setFormData({
          ...formData,
          images: allUploadedUrls,
        })
      );
    }
    if (parentName == " editOrder") {
      console.log("hello this is editOrder");
      // if (images) {
      //   setImages([...images, ...allUploadedUrls]);
      // }
      // if (!images) {
      //   setImages(allUploadedUrls);
      // }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*" as any, // accept only image files
    onDrop: handleDrop,
  });

  function handleRemoveLocalImages(index: number) {
    if (selectedImage && fileData) {
      const newSelectedImageData = [
        ...selectedImage.slice(0, index),
        ...selectedImage.slice(index + 1),
      ];
      const newFileData = [
        ...fileData.slice(0, index),
        ...fileData.slice(index + 1),
      ];

      setSelectedImage(newSelectedImageData);
      setFileData(newFileData);
    }
  }

  return (
    <div {...getRootProps()} className="border rounded p-9 mb-10">
      {selectedImage && selectedImage?.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            {selectedImage?.map((image, index: number) => (
              <div className="relative inline-block" key={index}>
                <RiDeleteBin5Line
                  className="absolute right-5 top-4 bg-gray-300 rounded p-0.5 cursor-pointer"
                  size={24}
                  onClick={() => handleRemoveLocalImages(index)}
                />

                <Image src={image} width="500" height="300" alt="Preview" />
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              className="w-56 py-4 text-xl font-normal primaryColor text-white"
              onClick={async () => {
                if (selectedImage) {
                  const cloudinaryResponse = await uploadToCloudinary(fileData);
                }
              }}
              disabled={disableButton}
            >
              {disableButton ? "Uploading ..." : "Upload"}
            </button>
          </div>
        </>
      ) : (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <div className="flex justify-center flex-col items-center">
              <div className="cursor-pointer">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 40C10.9 40 9.958 39.608 9.174 38.824C8.39 38.04 7.99867 37.0987 8 36V30H12V36H36V30H40V36C40 37.1 39.608 38.042 38.824 38.826C38.04 39.61 37.0987 40.0013 36 40H12ZM22 32V15.7L16.8 20.9L14 18L24 8L34 18L31.2 20.9L26 15.7V32H22Z"
                    fill="#7E223C"
                  />
                </svg>
              </div>
              <p className="pt-4 text-xl font-thin">Drag and drop file </p>
              <p className="pb-4 text-xl font-thin">or</p>
              <button className="w-56 buyProcessBorder py-4  text-xl font-normal primaryColor text-white ml-8">
                Browse
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageUploader;
