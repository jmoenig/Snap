LOGO_SIZE=85

convert ../../netsblox_logo.png -resize $LOGO_SIZE netsblox_logo_small.png
base64 netsblox_logo_small.png > netsblox-logo.txt
echo "const LOGO_IMAGE = \"data:image/png;base64,$(cat netsblox-logo.txt | tr -d '\n')\";" > src/logo.js
