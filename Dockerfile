# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# -----------------------------
# Install dependencies first (for caching)
# -----------------------------
# Copy package.json and lock file from the portal subfolder (paths contain spaces, so use array syntax)
COPY ["Clients + Projects/Big Marble Farms/Workshop/Workshop Portal/package.json", \
      "Clients + Projects/Big Marble Farms/Workshop/Workshop Portal/package-lock.json", \
      "./"]
RUN npm ci

# -----------------------------
# Copy the rest of the application source
# -----------------------------
COPY ["Clients + Projects/Big Marble Farms/Workshop/Workshop Portal", "./"]

# Build the Next.js application
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Change ownership of the app directory to the nextjs user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
