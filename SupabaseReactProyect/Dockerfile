FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

WORKDIR /app/supabase-react

RUN chmod +x node_modules/.bin/react-scripts

EXPOSE 3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

