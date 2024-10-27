// components/branch-office/Images.tsx
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

interface ImageData {
  imageType: string; 
  publicId: string; 
  url: string;
}

interface ImagesProps {
  officeImages: ImageData[] | undefined;
  isLoading: boolean;
}

export const Images: React.FC<ImagesProps> = ({ officeImages, isLoading }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4 mb-8">
        {isLoading ? (
          <div className="animate-pulse bg-gradient-to-r from-primary to-red-950 h-80 w-full rounded-lg"></div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
