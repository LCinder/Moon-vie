FROM alpine AS base_image

RUN adduser -S node && apk add --no-cache --update nodejs npm make && mkdir /node_modules && chown node /node_modules

USER node

COPY package*.json ./

RUN npm ci && npm cache clean --force

FROM base_image AS install

COPY --from=base_image /node_modules /node_modules

WORKDIR /src/src

ENV PATH=/node_modules/.bin:$PATH

CMD ["gulp"]
CMD ["gulp", "test"]