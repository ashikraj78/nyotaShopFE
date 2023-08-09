import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      // This function is called when the files are dropped onto the Dropzone
      onDrop(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*" as any, // accept only image files
    onDrop: onDropAccepted,
  });

  return (
    <div {...getRootProps()} className="border rounded  p-9 mb-10">
      {selectedImage && (
        <Image src={selectedImage} width="500" height="300" alt="Preview" />
      )}
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here ...</p>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <div>
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
    </div>
  );
};

export default ImageUploader;
