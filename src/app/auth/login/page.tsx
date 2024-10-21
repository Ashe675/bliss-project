import { LogoType, LogoWhite } from "@/components";
import LoginForm from "@/components/auth/login/LoginForm";


export const metadata = {
 title: 'Login Bliss',
 description: 'Inicio de sesión en Bliss',
};

export default function LoginPage() {
  return (
    <div className=" flex flex-col items-center gap-y-1 pt-3 text-white">
      <LogoWhite height={165} width={165} />
      <LogoType height={165} width={165} />
      <h1 className=" text-2xl sm:text-3xl font-bold mt-3 mb-2" >Inicia Sesión</h1>
      <LoginForm/>
    </div>
  );
}
