"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Stars from "./Stars";
import { useSession } from 'next-auth/react';
import { postEmployeeReview } from "@/actions/employee/post-employee-review";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type RatingFormData = {
  comment: string;
  stars: number;
  employeeId: string | undefined;
};

interface Props {
  employeeId: string;
}

export default function RatingForm({ employeeId }: Props) {
  const [selectedStars, setSelectedStars] = useState<number>(0);  
  const { register, handleSubmit, formState: { errors } } = useForm<RatingFormData>();
  const { data: session } = useSession();
  const router = useRouter(); 

  const userId = session?.user?.id;

  const onRatingChange = (rating: number) => {
    setSelectedStars(rating); 
  };

  const onSubmit = async (data: RatingFormData) => {
    if (!userId) {
      toast.error("Debes iniciar sesión para dejar una calificación.");
      return;
    }

    const ratingData = {
      comment: data.comment,
      rating: selectedStars, 
      revieweeId: employeeId,
      reviewerId: userId,
      date: new Date().toISOString(),
    };

    // Usar toast.promise para manejar las notificaciones
    await toast.promise(
      postEmployeeReview(ratingData), // Promesa de la operación
      {
        pending: "Enviando tu reseña...",
        success: "¡Reseña enviada exitosamente!",
        error: "Error al enviar la reseña. Inténtalo nuevamente.",
      }
    )
      .then(() => {
        router.refresh(); // Refrescar la página si es exitoso
      })
      .catch((error) => {
        console.error(error); // Manejar errores si ocurren
      });
  };

  return (
    <div className="text-center flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-5">Tu opinión nos importa</h2>
      <Stars onRatingChange={onRatingChange} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md mx-auto mt-4"
      >
        <div className="flex flex-col gap-y-2">
          <textarea
            id="comment"
            {...register("comment", { required: "El comentario es requerido." })}
            placeholder="Deja tu comentario"
            className="bg-primary/30 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
            rows={4}
          />
          {errors.comment && (
            <span className="text-red-500 text-md font-light">
              {errors.comment.message}
            </span>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md"
          >
            Enviar Calificación
          </button>
        </div>
      </form>

     
    </div>
  );
}
