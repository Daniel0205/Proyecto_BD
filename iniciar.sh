#!/bin/bash

echo -e "\n\e[15;48;5;2m\e[1m Instalando dependencias \e[0m"
cd Servidor
npm install
cd ..
cd Cliente
npm install
cd ..

echo -e "\n\e[15;48;5;2m\e[1m Construyendo contenedores \e[0m"
docker build -f Dockerfile-db -t db .
docker build -f Dockerfile-servidor -t servidor .
docker build -f Dockerfile-cliente -t cliente .

echo -e "\n\e[15;48;5;2m\e[1m Levantando contenedores \e[0m"
docker-compose up

