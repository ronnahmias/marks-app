FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 3333

CMD ["yarn", "run", "start:dev"]
