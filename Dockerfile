FROM alpine AS base_image

# Se crea el usuario con privilegios especificos para el directorio node_modules
RUN adduser -S node && apk add --no-cache --update nodejs npm make && mkdir /node_modules && chown node /node_modules

USER node

COPY package*.json ./

# npm ci es especifico para entornos CI
RUN npm ci && npm cache clean --force

# Multi-stage: Optimizacion imagen
FROM base_image AS install

# Etapa anterior
COPY --from=base_image /node_modules /node_modules

# Se cambia el directorio de trabajo
WORKDIR /app/test

# Necesario otorgar permisos de escritura a usuario node ya que se compilan y se crear archivos .js
USER root

# Damos permisos de escritura
RUN chown node /app/test

# Volvemos a cambiar de usuario para ejecutar los test
#USER node

ENV PATH=/node_modules/.bin:$PATH

CMD ["gulp", "--gulpfile", "src/gulpfile.js", "tests"]
