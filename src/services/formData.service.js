export const formDataService = {
  updateImageFormData,
};

async function updateImageFormData(formDataId, images) {
  try {
    const response = await fetch(
      `http://localhost:4000/formData/updateImageFromData?id=${formDataId}`,
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
