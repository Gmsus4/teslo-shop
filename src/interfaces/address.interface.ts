export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null | undefined;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  state: string;
  suburb: string;

  // country: string;
  // address2: string | null;
  // postalCode: string;
  // phone: string;
  // city: string;
  // state: string;
  // suburb: string;
}

export interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  state: string;
  suburb: string;
  city: string;
  country: string;
  phone: string;
}
