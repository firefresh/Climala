# Climala

La app:

- Utiliza un diseño `responsive` para que funcione en PCs de escritorio o en dispositivos móviles.
- Por medio de un worker-service almacena previamente en cache los recursos de la aplicación
  (HTML, CSS, JavaScript, imágenes) necesarios para ejecutarse y tambien los datos meteorológicos
  en tiempo de ejecución para mejorar el rendimiento.
- Es instalable, utiliza un `manifest` de aplicación web y el evento `beforeinstallprompt`
  para notificar al usuario que es instalable.

## Caracteristicas

- Veremos si anda el clima realmente (en ingles jsjs)

## Mas info

1) Clona el repo o descargalo como zip y desempaquetalo.
2) Metete al directorio resultante y sobre el ,en una consola, ejecuta `npm install` para instalar las dependencias necesarias para ejecutar el servidor.
3) Edita `server.js` y configura la API key de servicio de clima (jsjs hay que buscar uno), no pasa nada si no se configura tiene datos para pruebas.
4) Ejecuta `node server.js` para iniciar el servidor en el puerto 8000.
5) Abrite una pestaña del navegador en `http://localhost:8000` y listo!


## Feedback

***

## DEVELOMENT

[x] Check de API of OpenWeatherMap
[x] Adapt code for that api.
[] Return a msg when the lenght of `location` is zero on `app.js`. 
