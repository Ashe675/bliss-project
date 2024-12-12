"use client";

import React, { useRef, useState } from "react";
import "../../../../swiper.css";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "../../ui/buttons/CustomButton";
import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { deletePostById } from "@/actions";
import { toast } from "react-toastify";

interface Post {
  id: string;
  title: string;
  createdAt: string | Date;
  images: { id: string; url: string; publicId: string; imageType: string }[];
}

interface PostsProps {
  posts: Post[];
  isTheSameEmployee?: boolean;
}

// Define displayName for memoized component
const Posts: React.FC<PostsProps> = React.memo(
  ({ posts, isTheSameEmployee }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const toastId = useRef<null | number | string>(null);

    const handleOpenModal = (post: Post) => {
      setSelectedPost(post);
      setIsModalOpen(true);
    };

    const handleDeletePost = async () => {
      if (selectedPost) {
        setIsLoading(true);
        toastId.current = toast.loading(`${"Eliminando publicación..."}`);
        const res = await deletePostById(selectedPost.id);

        if (!res.ok) {
          toast.update(toastId.current!, {
            render: res.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            icon: <IconAlertTriangleFilled color="#dc2626" />,
          });

          setIsLoading(false);

          return;
        }
        toast.update(toastId.current!, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          icon: <IconSquareRoundedCheckFilled className=" text-green-500" />,
        });
        setSelectedPost(null);
        setIsModalOpen(false);
        setIsModalDeleteOpen(false);
        setIsLoading(false);
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <section>
        <h3 className="text-lg font-semibold mt-6 mb-4">Publicaciones:</h3>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary border-red-950/50 via-red-600/50 to-primary rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-white mb-4">
              ¡No hay publicaciones aún!
            </h4>
          </div>
        ) : (
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
                      loading="lazy" // Habilitamos lazy loading en la imagen
                    />
                  )}
                </div>
                <div className="w-full ml-6 flex flex-col justify-start items-start p-4 rounded-md">
                  <h4 className="font-semibold text-lg mb-1 truncate">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-200">
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Modal */}
        <CustomModal isOpen={isModalOpen} closeModal={handleCloseModal}>
          {selectedPost && (
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">
                {selectedPost.title}
              </h3>
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
                      loading="lazy" // Habilitamos lazy loading en la imagen
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {isTheSameEmployee && (
                <CustomButton
                  type="cancel"
                  onClick={() => setIsModalDeleteOpen(true)}
                  className=" w-full mt-3 font-normal"
                >
                  Eliminar Publicación
                </CustomButton>
              )}
            </div>
          )}
        </CustomModal>

        <CustomModal
          isOpen={isModalDeleteOpen}
          closeModal={() => setIsModalDeleteOpen(false)}
        >
          <h2 className="text-2xl  text-white mb-4 text-center">
            Eliminar la publicación{" "}
            <span className="font-bold">{selectedPost?.title}</span>
          </h2>
          <p className="text-gray-100 mb-2 text-center">
            <IconAlertTriangle
              size={24}
              className="text-red-500 inline-block mr-2"
            />
            Esta acción no se puede deshacer
            <IconAlertTriangle
              size={24}
              className="text-red-500 inline-block ml-2"
            />
          </p>
          <p className="text-gray-200 mb-6 text-center">
            ¿Está seguro de eliminar esta publicación?
          </p>
          <div className="flex gap-4 justify-center">
            <CustomButton
              type="primary"
              className="w-32 hover:shadow-md"
              onClick={() => setIsModalDeleteOpen(false)}
              disabled={isLoading}
            >
              <div className="flex justify-center">
                <p>Cancelar</p>
              </div>
            </CustomButton>
            <CustomButton
              type="cancel"
              disabled={isLoading}
              className="w-32 hover:shadow-md"
              onClick={handleDeletePost}
            >
              <div className="flex justify-center">
                <p>{"Eliminar"}</p>
              </div>
            </CustomButton>
          </div>
        </CustomModal>
      </section>
    );
  }
);

// Set displayName explicitly for React.memo
Posts.displayName = "Posts";

export default Posts;
