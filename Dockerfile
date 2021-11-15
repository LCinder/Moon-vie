FROM alpine AS base_image

# Se crea el usuario con privilegios especificos para el directorio node_modules
RUN adduser -S node && apk add --no-cache --update nodejs npm make && mkdir /node_modules && chown node /node_modules

USER node

COPY package*.json ./

# npm ci es especifico para entornos CI
RUN npm ci && npm cache clean --force

# Multi-stage: Optimizacion imagen
FROM base_image AS install

COPY --from=base_image /node_modules /node_modules

# Se cambia el directorio de trabajo
WORKDIR /app/test/src

ENV PATH=/node_modules/.bin:$PATH

CMD ["gulp"]
CMD ["gulp", "test"]