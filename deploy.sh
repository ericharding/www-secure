#!/bin/bash

pnpm run build
ssh eric@digitalsorcery.net rm digitalsorcery/secure/assets/*
scp -r dist/* eric@digitalsorcery.net:digitalsorcery/secure/
ssh eric@secure.digitalsorcery.net rm /www/secure/assets/*
scp -r dist/* eric@secure.digitalsorcery.net:/www/secure/
