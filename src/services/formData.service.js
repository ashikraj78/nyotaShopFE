export const formDataService = {
  updateImageFormData,
};
const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;

async function updateImageFormData(formDataId, images) {
  try {
    const response = await fetch(
      `${backEndURI}/formData/updateImageFromData?id=${formDataId}`,
      {
        method: "PUT",
        body: JSON.stringify({ images }),
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
