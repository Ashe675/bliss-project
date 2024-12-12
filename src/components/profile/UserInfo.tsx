interface UserInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  username : string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  firstName,
  lastName,
  verified,
  email,
  username
}) => {
  return (
    <div className="p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          {firstName} {lastName}
        </h1>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Usuario:</span>
        <div className="input">
          <p>{username}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Correo:</span>
        <div className="input">
          <p>{email}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Verificado:</span>
        <div className="input">
          <p>{verified ? "Sí" : "No"}</p>{" "}
          {/* Ternario para mostrar 'Sí' o 'No' */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
