"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Stars from "./Stars";
import { useSession } from 'next-auth/react';
import { postEmployeeReview } from "@/actions/employee/post-employee-review";
import { ToastNotification, notifySuccess, notifyError } from "@/components/ui/toast-notification/ToastNotification";
import { toast } from "react-toastify";

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

  const userId = session?.user?.id;

  const onRatingChange = (rating: number) => {
    setSelectedStars(rating); 
  };

  const onSubmit = async (data: RatingFormData) => {
    if (!userId) {
      notifyError({ message: "Debes iniciar sesión para dejar una calificación." });
      return;
    }

    const ratingData = {
      comment: data.comment,
      rating: selectedStars, 
      revieweeId: employeeId,
      reviewerId: userId,
      date: new Date().toISOString(),
    };

    // Mostrar la notificación de carga y guardar el ID
    const loadingToastId = toast.loading("Enviando tu reseña...");

    try {
      const response = await postEmployeeReview(ratingData);

      // Cerrar la notificación de carga
      toast.dismiss(loadingToastId);

      if (response.success) {
        notifySuccess({ message: "¡Reseña enviada exitosamente!" });
      } else {
        notifyError({ message: "Error al enviar la reseña. Inténtalo nuevamente." });
      }
    } catch (error) {
      // Cerrar la notificación de carga en caso de error
      toast.dismiss(loadingToastId);
      notifyError({ message: "Error al enviar la reseña. Inténtalo nuevamente." });
      console.error(error);
    }
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
      
      {/* Contenedor de Toast */}
      <ToastNotification />
    </div>
  );
}
