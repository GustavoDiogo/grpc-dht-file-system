#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'
OK_EMOJI_TEXT='\n✅\n'

echo -e "${YELLOW}Updating apt repositories...${RESET}"
sudo apt update && sudo apt upgrade
echo -e "${OK_EMOJI_TEXT}" 

echo -e "${YELLOW}Installing essential packages...${RESET}"
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget
echo -e "${OK_EMOJI_TEXT}"

echo -e "${YELLOW}Installing curl...${RESET}"
sudo apt-get install curl
echo -e "${OK_EMOJI_TEXT}" 

if ! [ -n "$(command -v nvm)" ]; then
  echo -e "${YELLOW}Installing NVM...${RESET}"
  eval "$(curl -o-  https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh| bash | grep -E -v "^.?=>")"
  echo -e "${OK_EMOJI_TEXT}"
fi

if [ -n "$(command -v nvm)" ]; then
  echo -e "${YELLOW}Installing Node.js 22...${RESET}"
  nvm install 22
  node_version=$(node -v)
  echo -e "${GREEN}Installed version: ${RESET}${RED}${node_version}${RESET}"
  echo -e "${OK_EMOJI_TEXT}"
fi

echo -e "${YELLOW}Installing Node.js dependencies...${RESET}"
npm i
cd server
npm i
cd ..
cd client-node
cd ..
npm i
echo -e "${OK_EMOJI_TEXT}"

if [ -n "$(command -v python3 --version)" ]; then
  echo -e "${YELLOW}Installing Python 3...${RESET}"
  sudo apt install python3
  python_version=$(python3 --version)
  echo -e "${GREEN}Installed version: ${RESET}${RED}${python_version}${RESET}"
  echo -e "${OK_EMOJI_TEXT}"
fi

echo -e "${YELLOW}Installing Python dependencies...${RESET}"
cd client-python
pip install -r requirements.txt
cd ..
echo -e "${OK_EMOJI_TEXT}"