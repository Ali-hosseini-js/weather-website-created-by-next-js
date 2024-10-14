export default function ConvertKelvinToCelsius({temp}) {  
    const tempInCelsius = temp - 273.15;
    return Math.floor(tempInCelsius); // Removes decimal part and keeps integer part
  }
  