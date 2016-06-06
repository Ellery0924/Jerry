#!/usr/bin/env bash
grunt babel
webpack -p
grunt build
node ./configureMd5.js