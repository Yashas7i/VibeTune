# Step 1: Build the application with Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the project (this should generate the tailwindcss and vite build output)
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:alpine

# Remove the default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the Vite build to Nginx's HTML folder
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

