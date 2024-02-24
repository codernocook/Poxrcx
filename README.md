# Poxrcx
Poxrcx Source code.

# How to host?
Check `.env` and fill it out.\
Install packages, type: `npm install` or `npm i`.\
To start the bot, type: `npm start`.

.env file with explainations:
```env
token=                  your discord bot token.
client_id=              your discord bot client id.
prefix=                 the discord bot prefix, normally it should be "./".
ownerid=                the owner id, it's your discord id.
weatherapitoken=        openweathermap.org get the api key here.
authentication_db=      the password to access to the database.
afkdb=                  The database key (Use OydsnDB) for AFK command.
prefixdb=               The database key (Use OydsnDB) for prefix command.
errordb=                The database key (Use OydsnDB) for logging error into database.
personaldb=             The database key (Use OydsnDB) for birthday command.
gemini_ai=              Gemini AI token, you can get it from: https://aistudio.google.com/app/apikey/
command_timelimit=900   Limit user from spamming command, normally it's 900 milliseconds.
```

# Database
Database project: https://github.com/codernocook/OydsnDB/
This database make for project like Poxrcx, to use read "README.md" file in the [OydsnDB](https://github.com/codernocook/OydsnDB/) repo.
