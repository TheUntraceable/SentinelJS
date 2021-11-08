FROM ubuntu:latest

#Download Installs
SHELL ["/bin/bash", "-c"] 
RUN apt update -y
RUN DEBIAN_FRONTEND=noninteractive apt -y -f install nodejs python3 git curl wget sudo nano build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" 
RUN source ~/.bashrc
RUN . ~/.nvm/nvm.sh; nvm install v16.6.0
RUN . ~/.nvm/nvm.sh; npm install -g pm2 yarn
# Create the bot's directory
RUN git clone https://github.com/TheUntraceable/SentinelJS
WORKDIR SentinelJS
RUN cd SentinelJS
RUN npm install
RUN cd "Bot Files"
RUN "Starting Code"

# Start the bot.
CMD ["node", "./Bot Files/SecurityMain.js"]
