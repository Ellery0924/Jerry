#!/usr/bin/env bash
grunt clean:beforebuild
grunt babel
webpack -p
grunt build
node ./configureMd5.js
grunt clean:afterbuild
git commit -a -m 'release'
git push