FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/supabase-react

RUN npm install

EXPOSE 3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
