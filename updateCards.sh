#!/usr/bin/env bash
cd ./src/assets/
rm -f cards.zip cards.zip.md5 cards.json
curl.exe https://ygocdb.com/api/v0/cards.zip.md5 -o cards.zip.md5
curl.exe https://ygocdb.com/api/v0/cards.zip -o cards.zip
unzip cards.zip
rm -f cards.zip
cd ../../