FROM node:18

RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    make \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --include=optional sharp

COPY . .

EXPOSE 3000 1433

CMD [ "node" , "index.mjs" ]