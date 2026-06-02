import React from "react";
import { animalsFetch } from "@/providers/api";
import BookingForm from "@/components/02_AnimalsPage/booking-form";
import Image from "next/image";

const AnimalDetails = async ({ params }) => {
  const par = await params;
  const animals = await animalsFetch();
  const animalId = Number(par.id);
  const animal = animals.find((a) => Number(a.id) === animalId);
  const {
      id,
      name,
      type,
      breed,
      price,
      weight,
      weightUnit,
      age,
      ageUnit,
      gender,
      color,
      location,
      division,
      description,
      image,
      images,
      category,
      healthStatus,
      vaccinated,
      homeDelivery,
      
    } = animal ?? {};

  if (!animal) {
    return <div className="p-8">Animal not found.</div>;
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div className="lg:col-span-2">
        <div className="rounded overflow-hidden shadow">
          {images && images.length > 0 ? (
            <Image
              loading="eager"
              src={images[0]}
              alt={name}
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-neutral-200 flex items-center justify-center">No image</div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-muted">{breed} • {type} • {location}</p>
          <div className="mt-3">
            <h2 className="text-xl sm:text-2xl font-semibold">Price: ৳{price.toLocaleString()}</h2>
          </div>

          <div className="mt-4 prose max-w-none text-sm sm:text-base">
            <p>{description}</p>
            <ul>
              <li>Weight: {weight} {weightUnit || 'kg'}</li>
              <li>Age: {age} {ageUnit || 'years'}</li>
              <li>Vaccinated: {vaccinated ? 'Yes' : 'No'}</li>
              <li>Home Delivery: {homeDelivery ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>

      <aside className="lg:col-span-1">
        <BookingForm animal={animal} />
      </aside>
    </div>
  );
};

export default AnimalDetails;
