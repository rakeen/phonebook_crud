FROM node:14.4.0
COPY . /usr/src
WORKDIR /usr/src/
RUN npm i
RUN npm run build

FROM node:14.4.0
COPY . /usr/src
COPY --from=0 /usr/src/q01/build /usr/src/q01/build
WORKDIR /usr/src/
RUN npm i
EXPOSE 80
CMD ["PORT=80 npm run start:prod"]