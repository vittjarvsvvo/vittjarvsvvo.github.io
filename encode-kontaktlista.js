var fs = require("fs");
var stdinBuffer = fs.readFileSync('kontaktlista-content.html', 'utf-8');
const input = stdinBuffer.toString();
const encoded = Buffer.from(input).toString('base64');
fs.writeFileSync('assets/dnZvMjAxNg.txt', encoded, 'utf-8');