/**
 * Decodes kontaktlista content
 */
var fs = require("fs");
var stdinBuffer = fs.readFileSync('assets/dnZvMjAxNg.txt', 'utf-8');
const input = stdinBuffer.toString();
const decoded = Buffer.from(input, 'base64').toString();
console.log(decoded);