import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>
        <p className="space-x-2 text-center">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="tracking-[-0.5px] text-teal-900 font-medium"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form className="flex flex-col mt-[60px] gap-4">
        <Input type="name" placeholder="Nome" name="name" />
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Senha" name="password" />
        <Button label="Criar conta" />
      </form>
    </>
  );
}
