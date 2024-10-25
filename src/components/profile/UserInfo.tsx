interface UserInfoProps {
  firstName: string;
  lastName: string;
  username: string;
  description: string;
  email: string;
  joinedDate: string; 
  idUser:number;
}

const UserInfo: React.FC<UserInfoProps> = ({ firstName, lastName, username, idUser ,description, email, joinedDate }) => {
  return (
    <div className="p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{firstName} {lastName}</h1>
        

      </div>
      
      <div className="mb-4">
        <span className="font-semibold">Usuario:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
        <p>{username}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Correo:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
        <p>{email}</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">id Usuario:</span>
        <div className="bg-primary bg-opacity-25 rounded-md pl-3"> 
        <p>{idUser}</p>
        </div>
      </div>

      
    </div>
  );
};

export default UserInfo;
