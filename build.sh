#!/usr/bin/env bash
grunt clean
grunt babel
webpack -p
grunt build
node ./configureMd5.js
