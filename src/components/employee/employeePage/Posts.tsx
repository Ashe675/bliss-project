// import React from 'react';

// interface Post {
//   id: string;
//   title: string;
//   createdAt: string | Date;
//   images: Image[];
// }

// interface Image {
//   id: string;
//   url: string;
//   publicId: string;
//   imageType: string;
// }

// interface PostsProps {
//   posts: Post[];
// }

// const Posts: React.FC<PostsProps> = ({ posts }) => {
//   return (
//     <section>
//       <h3 className="text-lg font-semibold mt-6 mb-4">Publicaciones:</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-gradient-to-r from-red-950 border-red-950 border via-orange-800/80 to-primary/80 rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-right animate-gradient"
//           >
//             <div className="relative w-full h-48 overflow-hidden group">
//               {post.images.length > 0 && (
//                 <img
//                   src={post.images[0].url}
//                   alt={post.title}
//                   className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
//                 />
//               )}
//             </div>
//             <div className="p-4">
//               <h4 className="font-semibold text-lg mb-1 truncate">{post.title}</h4>
//               <p className="text-sm text-gray-200">
//                 {new Date(post.createdAt).toLocaleDateString('es-ES', {
//                   day: '2-digit',
//                   month: 'long',
//                   year: 'numeric',
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Posts;




'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../../swiper.css';

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
  return (
    <section>
      <h3 className="text-lg font-semibold mt-6 mb-4">:</h3>
      {posts.length > 0 ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {posts.map((post) => (
            <SwiperSlide
              key={post.id}
              className="bg-gradient-to-r from-red-950 border-red-950 border via-orange-800/80 to-primary/80 rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-right animate-gradient"
            >
              <div className="relative w-full h-48 overflow-hidden group">
                {post.images.length > 0 && (
                  <img
                    src={post.images[0].url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-4">
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
        <p>No hay publicaciones disponibles</p>
      )}
    </section>
  );
};

export default Posts;
