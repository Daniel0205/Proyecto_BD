# Proyecto final Bases de Datos
NotThatEasyTaxy es un emprendimiento que quiere permitir a los usuarios de taxi de cualquier lugar del mundo, pedir un servicio desde una aplicación móvil. Esta aplicación es una versión super simplificada de aplicaciones como Uber que solo funciona de manera local.

Este proyecto se compone de una interfaz que se visualiza a traves de un navegador de internet, que esta conectada a un REST API, que a su vez se conecta a una base de datos en PostgreSQL.

Esta aplicación esta en etapa de desarrollo y se construyó como parte del proyecto final presentado en la asignatura Bases de Datos del programa de Ingenieria de Sistemas.

# Requerimientos
1. Instalar [__NodeJS__](https://nodejs.org) *version >= 4*
2. Instalar [__PostgreSQL__](https://www.postgresql.org) *version >= 9.1*
3. Instalar [__PostGIS__](https://postgis.net/install/) *version >= 2.2*
4. Instalar [__Git__](https://git-scm.com/download/win)
5. Instalar [__Docker CE__](https://docs.docker.com/install/linux/docker-ce/ubuntu/) y [__Docker Compose__](https://docs.docker.com/compose/install/) *(No es necesario para la instalación alternativa)*

# Pasos para correr el proyecto  de Instalación
```bash
$ git clone https://github.com/Daniel0205/Proyecto_BD
$ cd Proyecto_BD
$ ./iniciar.sh
```
Cuando el script se termine de ejecutar, aparecerá en la terminal unas lineas de codigo como estas:
```bash
cliente_1   | Compiled successfully!
cliente_1   | 
cliente_1   | You can now view proyecto_bd in the browser.

```
Abrir un navegador web en la dirección localhost:3000

# Instalación alternativa 
```bash
$ git clone https://github.com/Daniel0205/Proyecto_BD
```
Hacer dos cambios en el código fuente para ajustarar la configuración a conexión local:

Directorio: Cliente <br /> 
Archivo: package.json (linea 28) <br /> 
Cambio: "proxy": "http://<span></span>servidor:3001/" --> "proxy": "http://<span></span>localhost:3001/" <br /> 

Directorio: Servidor <br />
Archivo: app.js (linea 18) <br />
Cambio: host: 'db' --> host: '127.0.0.1' <br /> <br /> 

Abrir PostgreSQL, crear una nueva base de datos con los valores por defecto con el nombre "NotThatEasyTaxi" y ejecutar los scripts que se encuentran en el archivo 'NotThatEasyTaxi.sql'<br /> <br />                  

Ubicar el directorio "Servidor" que se encuentra dentro del directorio "Proyecto_BD" donde se descargo el proyecto y abrir una terminal, luego ejecutar los siguientes comandos:
```bash
$ npm install
$ npm start
```
Ubicar el directorio "Cliente" que se encuentra dentro del directorio "Proyecto_BD" donde se descargo el proyecto y abrir una nueva terminal, luego ejecutar los siguientes comandos:
```bash
$ npm install
$ npm start
```
Se abrirá el navegador por defecto con la aplicación corriendo en la dirección http://localhost:3000 
