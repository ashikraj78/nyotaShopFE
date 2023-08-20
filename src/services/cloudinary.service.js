export const cloudinaryService = {
  deleteCloudinaryImage,
};
const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;

async function deleteCloudinaryImage(imageURL) {
  let publicId = imageURL.split("/").pop().split(".")[0];
  try {
    const response = await fetch(`${backEndURI}/cloudinary/deleteImage`, {
      method: "POST",
      body: JSON.stringify({ publicId }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  } catch (error) {
    console.error(error);
  }
}
