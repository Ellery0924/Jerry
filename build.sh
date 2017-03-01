#!/usr/bin/env bash
grunt clean:beforebuild
grunt babel
webpack -p
grunt build
node ./configureMd5.js
grunt clean:afterbuild
git add ./public/dest/
git commit -m "publish new version"
git push