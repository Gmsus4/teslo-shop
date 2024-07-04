'use client'

import { useEffect } from 'react';
import Swal, { SweetAlertPosition } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = ({ title = 'Default title', icon = 'success', position = 'top-end', toast = true, showConfirmButton = false, timer = 2000, text = 'Default text' }) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    MySwal.fire({
      position: position as SweetAlertPosition, // Asegura que position sea del tipo SweetAlertPosition
      icon: icon = 'success',
      title: title,
      toast: toast,
      showConfirmButton: showConfirmButton,
      timer: timer,
      text: text
    });
  }, []);

  return null;
};

export default swal;
