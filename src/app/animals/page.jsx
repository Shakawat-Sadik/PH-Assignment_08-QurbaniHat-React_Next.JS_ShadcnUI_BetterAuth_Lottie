import { animalsFetch } from "@/providers/api";
import React from "react";

const AnimalsPage = async () => {
  const animals = await animalsFetch();

  const animalCount = animals.reduce((acc, animal) => {
    const type = animal?.type;
    if (!type) return acc;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  console.log(animalCount);

  const knownTypes = Object.keys(animalCount);

  console.log(knownTypes);

  return (
    <div>
      {knownTypes.map((type) => (
        <p className="text-xl" key={type}>
          {type}: {animalCount[type] || 0}
        </p>
      ))}
    </div>
  );
};

export default AnimalsPage;

/*
Noob:
  const bull = a?.reduce((total, type) => {
    return type === "Bull" ? total + 1 : total;
  }, 0);
  const camel = a?.reduce((total, type) => {
    return type === "Camel" ? total + 1 : total;
  }, 0);
  const goat = a?.reduce((total, type) => {
    return type === "Goat" ? total + 1 : total;
  }, 0);
  const ram = a?.reduce((total, type) => {
    return type === "Ram" ? total + 1 : total;
  }, 0);
  const buffalo = a?.reduce((total, type) => {
    return type === "Buffalo" ? total + 1 : total;
  }, 0);

  const animalCount = [{bull: bull}, {camel: camel}, {goat: goat}, {ram: ram}, {buffalo: buffalo}];
  console.log(animalCount);

Pro:
  const animals = await animalsFetch();

  const animalCount = animals.reduce((acc, animal) => {
    const type = animal?.type;
    if (!type) return acc;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  console.log(animalCount);

  const knownTypes = Object.keys(animalCount);

  console.log(knownTypes);
*/
