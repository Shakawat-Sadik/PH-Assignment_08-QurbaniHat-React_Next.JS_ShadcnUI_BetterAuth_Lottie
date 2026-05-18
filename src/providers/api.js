export const animalsFetch = async () => {
  try {
    const res = await fetch("https://api.npoint.io/8982ace3b4fd9eeb22fc");
    if (!res.ok) {
      throw new Error(`Failed to fetch animals: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log("Failed to fetch animals data", error);
    throw error;
  }
};