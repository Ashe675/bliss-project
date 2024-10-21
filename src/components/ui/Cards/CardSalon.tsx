'use client';
import React from 'react';
import { ImageSection, Label, TextSection, Stars } from './CardSalonParts';

type CardSalonProps = {
  name: string;
  stars: number;
  address: string;
  additionalAddress: string;
  label: string;
  imageUrl: string;
};

const CardSalon = ({ name, stars, address, additionalAddress, label, imageUrl }: CardSalonProps) => {
  return (
    <div className="relative z-10 w-[185px] h-[220px]">
      <ImageSection imageUrl={imageUrl} />
      <Label text={label} />
      <TextSection title={name} stars={stars} address={address} additionalAddress={additionalAddress} />
    </div>
  );
};

export default CardSalon;
