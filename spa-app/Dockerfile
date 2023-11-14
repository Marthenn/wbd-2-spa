FROM node:21-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install @mui/lab
COPY . .
EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev", "--host"]