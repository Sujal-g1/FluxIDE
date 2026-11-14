
FROM node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./services/ai-services/package*.json ./services/ai-services/
RUN cd services/ai-services && npm install

COPY services/ai-services ./services/ai-services
COPY shared ./shared

WORKDIR /app/services/ai-services

CMD [ "npm", "start" ]
