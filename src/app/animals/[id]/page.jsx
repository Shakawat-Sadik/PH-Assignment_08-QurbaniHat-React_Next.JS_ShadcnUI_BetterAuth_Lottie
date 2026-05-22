import React from "react";
import { animalsFetch } from "@/providers/api";
import BookingForm from "@/components/booking-form";
import Image from "next/image";

const AnimalDetails = async ({ params }) => {
  const id = Number(params.id);
  const animals = await animalsFetch();
  const animal = animals.find((a) => Number(a.id) === id);

  if (!animal) {
    return <div className="p-8">Animal not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="rounded overflow-hidden shadow">
          {animal.images && animal.images.length > 0 ? (
            <Image
              src={animal.images[0]}
              alt={animal.name}
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-neutral-200 flex items-center justify-center">No image</div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">{animal.name}</h1>
          <p className="text-sm text-muted">{animal.breed} • {animal.type} • {animal.location}</p>
          <div className="mt-3">
            <h2 className="text-xl font-semibold">Price: ৳{animal.price.toLocaleString()}</h2>
          </div>

          <div className="mt-4 prose max-w-none">
            <p>{animal.description}</p>
            <ul>
              <li>Weight: {animal.weight} {animal.weightUnit || 'kg'}</li>
              <li>Age: {animal.age} {animal.ageUnit || 'years'}</li>
              <li>Vaccinated: {animal.vaccinated ? 'Yes' : 'No'}</li>
              <li>Home Delivery: {animal.homeDelivery ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>

      <aside className="col-span-1">
        <BookingForm animal={animal} />
      </aside>
    </div>
  );
};

export default AnimalDetails;
