// Next has 2 kinds of data fetching methods. One is this simple import and return way. The other one is creating a route and fetching from that. Import and return only works for server components. The other method, the route and fetch method, should work for both server and client components. Though I used that only for client component yet.
// Regardless NextJS offer the most hassle free way of data fetching I've seen yet.

import animalPromise from "@/providers/animalsEndpoint.json";
import qTipsData from "@/providers/QTips.json";

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
    console.log("Serving data from the backup generator")
    return animalPromise;

  } catch (intError) {
    console.warn("Failed to fetch animals data from backup generator");
  }

  
  return [];
};

export const qTips = async () => {
  try {
    return qTipsData;
  } catch (error) {
    console.warn("Failed to fetch QTips data", error);
    return [];
  }
}