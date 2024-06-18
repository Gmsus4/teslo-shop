import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/actions';

export default async function AddressPage() {
  const countries = await getCountries();
  return (
    <div className="flex flex-col sm:justify-center sm:items-center md:h-[88vh] mb-72 md:mb-0 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries}/>
      </div>
    </div>
  );
}