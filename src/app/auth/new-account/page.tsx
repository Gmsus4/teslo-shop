import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

/* Estático */
export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 font-bold` }>Nueva cuenta</h1>

    <RegisterForm />
    </div>
  );
}