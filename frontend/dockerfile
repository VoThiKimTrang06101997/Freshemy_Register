FROM node:19-alpine

WORKDIR /app

COPY package*.json /app/


#instal all package
RUN npm install

COPY . ./

# run app
CMD ["npm", "start"]