import { Post } from '@prisma/client';
import React from 'react';

// Asegurando que el tipo Post tiene un campo de imágenes
interface PostWithImages extends Post {
  images: { url: string }[]; // Definir la estructura de `images`
}

interface EmployeePostsProps {
  posts: PostWithImages[];
}

const EmployeePosts: React.FC<EmployeePostsProps> = ({ posts }) => {
  return (
    <div className="w-full p-5">
      <h2 className="text-2xl font-semibold mb-4">Trabajos Recientes</h2>
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {posts.map((post) => (
          <div key={post.id} className="min-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Verificamos si hay al menos una imagen */}
            {post.images.length > 0 && (
              <img
                src={post.images[0].url}  // Usamos la primera imagen
                alt={post.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-600 mt-2">Publicado el {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePosts;
