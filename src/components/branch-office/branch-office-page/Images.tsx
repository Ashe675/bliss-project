// components/branch-office/Images.tsx
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

interface ImageData {
  imageType: string; 
  publicId: string; 
  url: string;
}

interface ImagesProps {
  officeImages: ImageData[] | undefined;
}

export const Images: React.FC<ImagesProps> = ({ officeImages }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4 md:w-3/4 mb-8">
       
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="rounded-lg shadow-md"
          >
            {officeImages?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </div>
  );
};
