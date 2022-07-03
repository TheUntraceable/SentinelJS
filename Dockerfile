FROM node:latest

WORKDIR /bot

COPY . .
RUN npm i

RUN cd "Bot Files"

# Start the bot.
CMD ["node", "./Bot Files/SecurityMain.js"]