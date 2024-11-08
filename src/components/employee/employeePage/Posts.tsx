'use client';
import React, { useState } from 'react';
import '../../../../swiper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CustomModal from '@/components/ui/modal/CustomModal';

interface Post {
  id: string;
  title: string;
  createdAt: string | Date;
  images: { id: string; url: string; publicId: string; imageType: string }[];
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Manejar el clic para abrir el modal con el post completo
  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mt-6 mb-4">Publicaciones: </h3>
      {posts.length > 0 ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            512: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {posts.map((post) => (
            <SwiperSlide
              key={post.id}
              className="bg-gradient-to-r flex flex-col items-start justify-start from-red-950 border-red-950 border via-orange-800/80 to-primary/80 rounded-lg"
              onClick={() => handleOpenModal(post)} 
            >
              <div className="relative w-full rounded-t-md h-48 overflow-hidden group">
                {post.images.length > 0 && (
                  <img
                    src={post.images[0].url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  />
                )}
              </div>
              <div className="w-full flex flex-col justify-start items-start p-4 rounded-md">
                <h4 className="font-semibold text-lg mb-1 truncate">{post.title}</h4>
                <p className="text-sm text-gray-200">
                  {new Date(post.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary border-red-950/50 via-red-600/50 to-primary rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold text-white mb-4">¡No hay publicaciones aún!</h4>
        </div>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {selectedPost && (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">{selectedPost.title}</h3>
            {/* Swiper para las imágenes del post */}
            <Swiper
              navigation={true}
              spaceBetween={10}
              slidesPerView={1}
              modules={[Navigation]}
            >
              {selectedPost.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={image.url}
                    alt={`${selectedPost.title} - ${image.imageType}`}
                    className="w-full h-80 object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </CustomModal>
    </section>
  );
};

export default Posts;