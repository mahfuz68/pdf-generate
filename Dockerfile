FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libglib2.0-0 \
    libnss3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Expose the port
EXPOSE 3000

CMD ["node", "index.js"]
