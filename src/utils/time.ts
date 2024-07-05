export const getTimeDate = (lastSeenDate: any) => {
  const dateStringWithoutTimeZone = lastSeenDate.replace(/\s\(.*\)/, '');
  const lastSeen = new Date(dateStringWithoutTimeZone);

//   const fecha = new Date('Wed Jul 03 2024');
  const opciones = {
    weekday: 'long' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const
  };
  const dateInSpanish = lastSeen.toLocaleDateString('es-ES', opciones);
  
  console.log(dateInSpanish); // Salida: miércoles, 3 de julio de 2024
  
  const arr = [];
  let currentTime = new Date();

  let milisegundo = currentTime.getTime() - lastSeen.getTime();
  let segundo = (currentTime.getTime() - lastSeen.getTime()) / 1000;
  let minuto = (currentTime.getTime() - lastSeen.getTime()) / (1000 * 60);
  let hora = (currentTime.getTime() - lastSeen.getTime()) / (1000 * 60 * 60);
  let day = (currentTime.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);
  let week =
    (currentTime.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24 * 7);
  let month =
    (currentTime.getTime() - lastSeen.getTime()) /
    (1000 * 60 * 60 * 24 * 30.4167);
  let year =
    (currentTime.getTime() - lastSeen.getTime()) /
    (1000 * 60 * 60 * 24 * 7 * 52);

  switch (true) {
    case milisegundo < 1000:
      arr.push(`Hace ${Math.floor(milisegundo)} milisegundos`);
      break;
    case milisegundo < 60000:
      arr.push(`Hace ${Math.floor(segundo)} segundos`);
      break;
    case milisegundo < 3600000:
      arr.push(`Hace ${minuto > 0 && minuto < 2 ? 'un minuto' : `${Math.floor(minuto)} minutos`}`);
      break;
    case milisegundo < 86400000:
      arr.push(`Hace ${hora > 0 && hora < 2 ? 'una hora' : `${Math.floor(hora)} horas`}`);
      break;
    case milisegundo < 604800000:
    //   arr.push(`Hace ${Math.floor(day)} días`);
      arr.push(`Hace ${day > 0 && day < 2 ? 'un día' : `${Math.floor(day)} días`}`);
      break;
    case milisegundo < 2592000000:
      arr.push(`Hace ${week > 0 && week < 2 ? 'una semana' : `${Math.floor(week)} semanas`}`);
      break;
    case milisegundo < 31104000000:
      arr.push(`Hace ${month > 0 && month < 2 ? 'un mes' : `${Math.floor(month)} meses`}`);
      break;
    default:
      arr.push(`Hace ${year > 0 && year < 2 ? 'un mes' : `${Math.floor(year)} años`}`);
  }

  return {
    arr,
    lastSeen: dateInSpanish
  };
};
