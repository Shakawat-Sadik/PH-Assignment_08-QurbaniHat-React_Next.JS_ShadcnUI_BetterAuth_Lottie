// import animalPromise from "/animalsEndpoint.json" // This only works in Vite or Create React App when json is kept in public folder
import animalPromise from "@/providers/animalsEndpoint.json"

export const animalsFetch = async () => {
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BETTER_AUTH_URL;
  
  try {
    const res = await fetch("https://api.npoint.io/8982ace3b4fd9eeb22fc");
    
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("Failed to fetch animals data", error);
  }

  try {
    const intRes = await fetch("/animalsEndpoint.json");

    console.log("Serving data from the backup generator")

    if (intRes.ok){
      console.log("serving data from backup generator");
      return await intRes.json();
    }
  } catch (intError) {
    console.warn("Failed to fetch animals data from backup generator", intError);
  }

  
  return [];
};