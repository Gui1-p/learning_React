FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Servidor (Usa o Nginx para entregar os arquivos)
FROM nginx:alpine
# O Vite coloca os arquivos prontos na pasta /dist
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]