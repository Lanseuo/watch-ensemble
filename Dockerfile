FROM golang as backend-builder

LABEL maintainer "Lucas Hild <contact@lucas-hild.de>"

ENV GO111MODULE=on

WORKDIR /go/src/app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY cmd /go/src/app/cmd
COPY internal /go/src/app/internal
COPY pkg /go/src/app/pkg
RUN ls
RUN CGO_ENABLED=0 go build -o app cmd/watchensemble/main.go

FROM node:13-alpine as frontend-builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY client /app/
RUN npm run build

FROM alpine
WORKDIR /usr/local/bin

RUN apk add ca-certificates

COPY --from=backend-builder /go/src/app/app /usr/local/bin/app
COPY --from=frontend-builder /app/build /usr/local/bin/static

ENTRYPOINT ["/usr/local/bin/app"]