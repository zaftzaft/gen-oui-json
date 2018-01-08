mkdir -p data

cd ./data
wget https://standards.ieee.org/develop/regauth/oui/oui.csv
wget https://standards.ieee.org/develop/regauth/oui28/mam.csv
wget https://standards.ieee.org/develop/regauth/oui36/oui36.csv
cd -

node main.js > oui.json
