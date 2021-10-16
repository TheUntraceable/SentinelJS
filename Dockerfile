FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
COPY . /usr/src/bot
RUN npm install

RUN cd "Bot Files"

# Start the bot.
CMD ["node", "./Bot Files/SecurityMain.js"]