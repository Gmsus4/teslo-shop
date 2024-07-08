'use client'

import { useEffect } from 'react';
import Swal, { SweetAlertPosition } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface SwalOptions {
  title?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  position?: SweetAlertPosition;
  toast?: boolean;
  showConfirmButton?: boolean;
  timer?: number;
  text?: string;
}

const useSwal = ({ title = 'Default title', icon = 'success', position = 'top-end', toast = true, showConfirmButton = false, timer = 2000, text = 'Default text' }: SwalOptions) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    MySwal.fire({
      position: position as SweetAlertPosition,
      icon: icon,
      title: title,
      toast: toast,
      showConfirmButton: showConfirmButton,
      timer: timer,
      text: text
    });
  }, [MySwal, icon, position, title, toast, showConfirmButton, timer, text]);
};

export default useSwal;