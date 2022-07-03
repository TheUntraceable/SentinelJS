echo "To run Sentinel, fill in everything I ask for."
echo "This will automatically start your bot which will use Sentinel's code."
echo "This will open it in a docker container, meaning you have to have docker installed."
echo "I will ask for sensitive information, I can promise it won't be shared, besides, if you really cared you would see the source code of this script."

sleep 5

echo "What is your Client's Token?"
read token

echo "What is your Client's Id?"
read clientId

echo "What is the URI for the MongoDB?"
read mongoURI

echo "What is the emoji you would like to use to represent cash?"
read cashEmoji

echo "What is your Statcord API Key?"
read statcordKey

echo "Create commands on startup?"
read devMode

echo "What is your Client Secret"
read secret

echo "What port would you like to run the dashboard on? May not be used."
read dashboardPort

echo "What is your redirect uri for the OAuth2?"
read redirectURI

echo "What version of Sentinel are you using? This will show up in the botstats command and will help me help you if needed."

echo -e "Starting Sentinel...\n\n" # 3 empty lines

echo -e '{    \n"clientId": $clientId,\n    "token": $token,\n    "version": "1.0",\n    "mongo_url": $mongoURI,\n    "cash_emoji": $cashEmoji,\n    "statcord-api-key": $statcordKey,\n    "dev": $devMode,\n    "redirect_uri": $redirectURI,\n    "secret": $secret\n}' > config.json