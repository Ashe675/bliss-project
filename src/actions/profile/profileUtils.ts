export const handleEditProfile = (
    newFirstName: string, 
    newLastName: string, 
    setUser: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      firstName: newFirstName,
      lastName: newLastName,
    }));
    alert('Nombre de usuario actualizado!');
  };
  