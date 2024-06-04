FROM node:21-alpine

# Install Python and other necessary build tools
RUN apk add --no-cache python3 make g++ 

# Set Python for node-gyp
ENV PYTHON=/usr/bin/python3

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies and rebuild node-pty
RUN npm install \
    && npm rebuild node-pty

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
