FROM node

RUN mkdir /node_modules

USER node

COPY package.json ./

RUN npm i

ENV PATH=/node_modules/.bin:$PATH

WORKDIR /src

CMD ["gulp"]
CMD ["gulp", "test"]