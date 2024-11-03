export interface Employee {
    id: string;
    name: string;
    role: string;
    profileImageUrl: string;
    rating: number;
    reviews: Review[];
  }
  
// interfaces.ts (o donde tengas tu interfaz definida)

export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  reviewerImage?: string; // Añadido campo para la imagen del revisor
}


  export interface EmployeeInfoProps {
    name: string;
    photoUrl?: string; // Puedes hacer este campo opcional
    specialty: string;
    rating: number; // Asegúrate de que sea un número
  }