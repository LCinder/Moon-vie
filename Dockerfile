FROM alpine AS base_image

# Se crea el usuario con privilegios especificos para el directorio node_modules
RUN adduser -S node && apk add --no-cache --update nodejs npm make && mkdir /node_modules && chown node /node_modules

USER node

# Multi-stage: Optimizacion imagen al isntalar en imagen intermedia
# los modulos
FROM base_image as install

COPY package*.json ./

# npm ci es especifico para entornos CI
RUN npm ci && npm cache clean --force

FROM base_image

# De la etapa anterior se copia la carpeta con los modulos
COPY --from=install /node_modules /node_modules

# Se cambia el directorio de trabajo
WORKDIR /app/test

ENV PATH=/node_modules/.bin:$PATH

CMD ["gulp", "test"]
