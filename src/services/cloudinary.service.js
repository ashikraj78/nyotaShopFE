export const cloudinaryService = {
  deleteCloudinaryImage,
};

async function deleteCloudinaryImage(imageURL) {
  let publicId = imageURL.split("/").pop().split(".")[0];
  try {
    const response = await fetch(
      "http://localhost:4000/cloudinary/deleteImage",
      {
        method: "POST",
        body: JSON.stringify({ publicId }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
  } catch (error) {
    console.error(error);
  }
}
