# Climala

App de clima PWA

Utiliza un diseño `responsive` para que funcione en PCs de escritorio o en dispositivos móviles.

Por medio de un worker-service almacena previamente en cache los recursos de la aplicación
  (HTML, CSS, JavaScript, imágenes) necesarios para ejecutarse y tambien los datos meteorológicos
  en tiempo de ejecución para mejorar el rendimiento.
 Es instalable, utiliza un `manifest` de aplicación web y el evento `beforeinstallprompt`
  para notificar al usuario de que es instalable.


## Mas info
Req: Node

1) Clona 
2) Ejecuta `npm install` sobre el directorio para instalar las dependencias necesarias para ejecutar el servidor.
3) Edita `server.js` y configura la API key de servicio de clima (OpenWeatherMap).
4) Ejecuta `node server.js` para iniciar el servidor en el puerto 8000.
5) En el navegador ingresa `http://localhost:8000`.

## DEVELOMENT

[x] Check de API of OpenWeatherMap
[x] Adapt code for that api.
[] Return a msg when the lenght of `location` is zero on `app.js`. 
