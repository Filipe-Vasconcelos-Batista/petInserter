FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the dev port
EXPOSE 3000

# Run in development mode
CMD ["npm", "run", "dev"]
