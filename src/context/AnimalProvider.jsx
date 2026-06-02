"use client";
import { useEffect, useState } from "react";
import { AnimalContext } from "./AnimalContextAPI";

const AnimalProvider = ({ children }) => {
  const [showAnimals, setShowAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch("https://api.npoint.io/8982ace3b4fd9eeb22fc");
        if (res.ok) {
          const data = await res.json();
          setShowAnimals(data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn("Primary fetch failed, trying backup...", error);
      }
      
      try {
        const intRes = await fetch("/api/animals");
        if (intRes.ok) {
          console.log("Serving data from backup generator");
          const data = await intRes.json();
          setShowAnimals(data);
        }
      } catch (intError) {
        console.warn("Failed to fetch animals data from backup generator", intError);
      } finally {
        console.log("Loading Finished with");
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // const fetchAnimals = async () => {
  //     try {
  //       const intRes = await fetch("/animalsEndpoint.json");
  //       if (intRes.ok) {
  //         console.log("Serving data from backup generator");
  //         const data = await intRes.json();
  //         setShowAnimals(data);
  //       }
  //     } catch (intError) {
  //       console.warn("Failed to fetch animals data from backup generator", intError);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // }

  // fetchAnimals();

  return (
    <AnimalContext.Provider
      value={{ showAnimals, setShowAnimals, loading, setLoading }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

export default AnimalProvider;
