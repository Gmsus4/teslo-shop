import * as yup from 'yup';

export const addressSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .required("El nombre es obligatorio"),
  
    lastName: yup
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .required("El apellido es obligatorio"),
  
    address: yup
      .string()
      .min(5, "La dirección debe tener al menos 5 caracteres")
      .max(100, "La dirección no puede tener más de 100 caracteres")
      .required("La dirección es obligatoria"),
  
    address2: yup
      .string()
      .max(100, "La segunda dirección no puede tener más de 100 caracteres"),
  
    postalCode: yup
      .string()
      .matches(
        /^\d{5,10}$/,
        "El código postal debe ser un número de 5 a 10 dígitos"
      )
      .required("El código postal es obligatorio"),
  
    state: yup
      .string()
      .min(2, "El estado debe tener al menos 2 caracteres")
      .max(50, "El estado no puede tener más de 50 caracteres")
      .required("El estado debe ser obligatorio"),
  
    suburb: yup
      .string()
      .min(2, "La colonia debe tener al menos 2 caracteres")
      .max(50, "La colonia no puede tener más de 50 caracteres")
      .required("La colonia debe ser obligatoria"),
  
    city: yup
      .string()
      .min(2, "La ciudad debe tener al menos 2 caracteres")
      .max(50, "La ciudad no puede tener más de 50 caracteres")
      .required("La ciudad es obligatoria"),
  
    country: yup.string().required("El país es obligatorio"),
  
    phone: yup
      .string()
      .matches(/^\+?[1-9]\d{1,14}$/, "El número de teléfono no es válido")
      .required("El teléfono es obligatorio"),
  
    rememberAddress: yup.boolean(),
});