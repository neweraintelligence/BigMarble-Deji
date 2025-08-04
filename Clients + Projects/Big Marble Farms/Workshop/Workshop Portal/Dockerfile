# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership of the app directory to the nextjs user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"] 