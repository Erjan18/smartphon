import React from 'react';
import { Phone } from '../types/Phone';
import PhoneCard from './common/PhoneCard';

interface FeaturedPhonesProps {
  title: string;
  phones: Phone[];
  viewAllLink?: string;
}

const FeaturedPhones: React.FC<FeaturedPhonesProps> = ({ title, phones, viewAllLink }) => {
  return (
    <div className="py-10">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-blue-600 hover:underline">
              Смотреть все
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPhones;