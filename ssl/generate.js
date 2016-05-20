/**
 * Created by Ellery1 on 15/9/29.
 */
var fs = require('fs'),
    content = fs.readFileSync('server.key', 'utf-8');

var js = "module.exports=\"" + content.replace(/([\n\r])/g, "\\n\"+\n\"") + "\";";

fs.writeFileSync('serverkey.js', js);