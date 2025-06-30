import { API_PATHS } from "./apiPath";
import api from "./axios";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

export default uploadImage;
