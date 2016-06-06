/**
 * Created by Ellery1 on 16/6/6.
 */
var fs = require('fs'),
    execSync = require('child_process').execSync,
    crypto = require('crypto');

var dest = './public/dest',
    baseJs = dest + '/base.min.js',
    indexJs = dest + '/index.js',
    style = dest + '/style.min.css';

execSync('grunt babel');
execSync('webpack -p');
execSync('grunt build');

function md5(content) {

    return crypto.createHash('md5').update(content).digest('hex');
}

var baseMd5 = md5(fs.readFileSync(baseJs)),
    indexMd5 = md5(fs.readFileSync(indexJs)),
    styleMd5 = md5(fs.readFileSync(style));

fs.renameSync(baseJs, baseJs.replace('.js', '@' + baseMd5 + '.js'));
fs.renameSync(indexJs, indexJs.replace('.js', '@' + indexMd5 + '.js'));
fs.renameSync(style, style.replace('.css', '@' + styleMd5 + '.css'));

fs.writeFileSync('./ver.json', JSON.stringify({
    base: '@' + baseMd5,
    index: '@' + indexMd5,
    style: '@' + styleMd5
}, null, 4));

fs.writeFileSync('./public/dest/index.js', fs.readFileSync(indexJs.replace('.js', '@' + indexMd5 + '.js')));

