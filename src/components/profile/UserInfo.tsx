interface UserInfoProps {
  firstName: string;
  lastName: string;
  description: string;
  email: string;
  joinedDate: string; 
  id:string;
  verified: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ firstName, lastName,  id ,verified, email }) => {
  return (
    <div className="p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{firstName} {lastName}</h1>
        

      </div>
      
      <div className="mb-4">
        <span className="font-semibold">Usuario y Correo:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
        <p>{email}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Verificado:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
          <p>{verified ? "Sí" : "No"}</p> {/* Ternario para mostrar 'Sí' o 'No' */}
        </div>
      </div>

      <div className="mb-4">
        <span className="font-semibold">id Usuario:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
        <p>{id}</p>
        </div>
      </div>

      
    </div>
  );
};

export default UserInfo;
