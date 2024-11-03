export interface Employee {
    id: string;
    name: string;
    role: string;
    profileImageUrl: string;
    rating: number;
    reviews: Review[];
  }
  
  export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }

  export interface EmployeeInfoProps {
    name: string;
    photoUrl?: string; // Puedes hacer este campo opcional
    specialty: string;
    rating: number; // Asegúrate de que sea un número
  }