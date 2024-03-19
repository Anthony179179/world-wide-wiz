# make sure you have postgres installed and a postgres server started
# do not run the web app on Safari

git clone https://github.com/Anthony179179/j2g.git
cd j2g

# in one terminal
cd back
npm i
cd prisma
# create a new file in the prisma folder called .env and add the following line in it replacing USER, PASSWORD, HOST, PORT, and DATABASE with your postgres credentials (you can run the following command for shortcut)
echo DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE" > .env 
npx prisma migrate
npm run all

# in another terminal...
cd front/
npm i
npm run dev

# go to the url provided 