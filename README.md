Como ejecutar el proyecto

1. Levantar PostgreSQL con Docker

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

Esto levanta la base de datos en segundo plano.

2. Ejecutar el backend

Entra a la carpeta backend:

```bash
./mvnw spring-boot:run
```

El backend quedara corriendo en:
http://localhost:8080

3. Ejecutar el frontend

Entra a la carpeta frontend:

npm install
npm run dev

La aplicación estará disponible en:
http://localhost:5173
