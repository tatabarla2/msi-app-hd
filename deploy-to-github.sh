echo "Initializing mobile app Github repo."
cd msi-app
git config user.name "user"
git config user.email "user@server"
git init
git add .
git commit -m "First commit."
git remote add origin https://github.com/tatabarla2/msi-app.git
git push -vf origin master

printf %10s | tr " " "\n"
git status

read -p "Completed pushing both repos to Github. Use PhoneGap build to create the mobile version now. Press [Enter] key when done..."
rm -rf *
git rm -rf *
git add .
git commit -m "Deleted everything."
git push -vf origin master

printf %10s | tr " " "\n"
git status

echo "Initializing tablet app Github repo."
cd ../msi-app-hd
git config user.name "user"
git config user.email "user@server"
git init
git add .
git commit -m "First commit."
git remote add origin https://github.com/tatabarla2/msi-app-hd.git
git push -vf origin master
echo -e tatabarla2

printf %10s | tr " " "\n"
git status

read -p "Completed pushing both repos to Github. Use PhoneGap build to create the tablet version now. Press [Enter] key when done..."
rm -rf *
git rm -rf *
git add .
git commit -m "Deleted everything."
git push -vf origin master
echo -e tatabarla2

printf %10s | tr " " "\n"
git status
