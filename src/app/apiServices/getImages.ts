"use server";
export const fetchImages = async () => {
  let data;
  try {
    const response = await fetch("/api/getAllImages");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error(error);
  }
  return data;
};
