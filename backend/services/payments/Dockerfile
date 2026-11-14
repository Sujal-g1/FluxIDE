
FROM node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./services/payments/package*.json ./services/payments/
RUN cd services/payments && npm install

COPY services/payments ./services/payments
COPY shared ./shared

WORKDIR /app/services/payments

CMD [ "npm", "start" ]
