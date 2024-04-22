# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm@5

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
