## Make sure you have postgres installed and a postgres server started
## Do not run the web app on Safari, preferably use Chrome
git clone https://github.com/Anthony179179/j2g.git
cd j2g
# Open up 2 terminals
## On terminal number 1:
cd back
npm i
### Create a new file called .env and add the following line in it replacing USER, PASSWORD, HOST, PORT, and DATABASE with your postgres credentials (you can run the following command as a shortcut, filling in with your details)
echo DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE" > .env\ 
cd prisma\
npx prisma migrate\
npm run all
## On terminal number 2:
cd front\
npm i\
npm run dev

# Navigate to the url provided (most probably localhost:5173)
