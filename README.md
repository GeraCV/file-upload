# Procesamiento archivo de ventas

El proyecto es una aplicación web que carga un archivo de ventas para ser procesado,
generar un resumen y guardar la información en base de datos.

#### Pasos para ejecutar la aplicación :

1. Asegúrate de tener NodeJS instalado y un SGBD como MySQL.
2. Clona o descarga el proyecto.
3. En la raíz del proyecto, copia y pega el archivo 'database.sql' en tu cliente
de base de datos (MySQL Workbench, PHPMyAdmin, HeidiSQL, etc), y ejecútalo.

##### Iniciar el servidor backend :

1. Abre el proyecto en una terminal como bash o cmd, y dirígete a la carpeta 'server'.
2. Crea un archivo .env en raíz de la carpeta 'server' y agrega las variables de entorno.
Las variables a utilizar las puedes visualizar en 'server/config/env.js'.
3. Ejecuta el comando 'npm install' y después 'npm run serve'. Si el proceso se ejecutó
correctamente visualizarás en consola un mensaje como "Servidor corriendo...".

##### Iniciar el servidor frontend :

1. Abre el proyecto en una terminal como bash o cmd, y dirígete a la carpeta 'client'.
2. Crea un archivo .env en raíz de la carpeta 'client' y agrega las variables de entorno.
Las variables a utilizar las puedes visualizar en 'client/src/env.js'.
2. Ejecuta el comando 'npm install' y después 'npm run dev'. Si el proceso se ejecutó
correctamente visualizarás en consola un mensaje como "Local: http://localhost...".

Abre un navegador y escribe en la parte de URL: localhost:5173, si todo ha salido verás
un título 'ventas' con 2 botones, uno para descargar el archivo CSV de prueba a cargar,
y el otro para cargar el archivo CSV que se procesará, además de una tabla donde se mostrarán los datos procesados.

**Nota:**

A continuación se enlistan las variables de entorno en caso de tener duda sobre cuales son. Cambia los valores si es necesario.

_BACKEND_:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=sales
DB_PORT=3306

_FRONTEND_:

VITE_API_URL=http://localhost:3000

**Mejoras**

A continuación se enlistan algunas mejoras que se pueden realizar en el proyecto.

__BACKEND_:

1. Extraer la configuración de multer en un archivo independiente y exportarla en donde sea requerida, además de añadir validaciones como tipos de archivos aceptados, cantidad máxima de archivos, tamaño máximo, etc.
2. El procesamiento actual es mediante streams y se realiza fila por fila. Si el archivo es muy grande, es recomendable procesar por lotes o batches, liberando periódicamente la memoria utilizada. Esto mejora el rendimiento y posible saturación en el servidor.
3. Integrar validaciones más exigentes en los datos que se están procesando, ya que esto es fundamental para mantener la integridad y el procesamiento correcto.
4. La información se guarda mediante un ciclo usando INSERT INTO por cada registro. La inserción se debe de realizar mediante LOAD DATA INFILE, haciéndolo de manera masiva y así evitar un posible cuello de botella. No se agregó debido a que se tiene que habilitar la opción LOAD_INFILE en MySQL, y es necesario realizar pasos extras para ejecutar el proyecto.

_FRONTEND_:

1. Las funciones y valores de estado se pasan como props, debido a que solamente es de padre a hijo, si la estructura fuera mas profunda, es mejor usar estado global, así podemos evitar _prop drilling_.
2. Separar la lógica de las llamadas al backend, para mantener componentes limpios y separación de responsabilidades.
3. Utilizar librerías para manejar tablas y formularios, como react-hook-form y tanstack table, ya que esto ayuda a una mejor UX.
4. Mejor manejor de mensajes para el cliente, es decir, mejor manejo de respuesta de estados HTTP.