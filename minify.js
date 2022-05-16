const UglifyJS = require("uglify-js");
const CleanCSS = require('clean-css');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ___commentKey = '@@';

require('dotenv').config();

const appSetting = require('./minify.json');
const minifyPathOutput = appSetting.MinifyPathOutput || './';
const minifyPathOutputCopy = appSetting.MinifyPathOutputCopy || '';
const arr = appSetting.items || [];

let _type = process.env.TYPE_ENV || '', fileOutput = '', fileOutputCopy = '';
_type = _type.trim();
if (_type == null || _type.length == 0) _type = '*';

console.log('> ... ');
console.log('> type = ', _type);
console.log('> PATH_OUTPUT = ', minifyPathOutput);
console.log('> PATH_OUTPUT_COPY = ', minifyPathOutputCopy);

function fileExist(file) {
    try {
        if (fs.existsSync(file)) return true;
    } catch (e) { ; }
    return false;
}

function fileFormatPath(file) { return file.split('//').join('/').split('\\\\').join('/').split('\\/').join('/'); }

//if (!fileExist('wwwroot')) fs.mkdirSync('wwwroot');

//console.log(arr);
let max = arr.length;
let notFind = '', log = '', s = '';
for (let i = 0; i < max; i++) {
    const it = arr[i];
    if (typeof it == 'string') continue;
    s = '';

    const outputFile = it.outputFileName || '',
        dirFiles = it.dirFiles || '',
        hasMinify = it.minify,
        inputs = it.inputFiles || [];

    const types = it.types || ['*'];
    const allow = _.findIndex(types, o => o == _type) >= 0;
    if (!allow) continue;
    console.log('\t|> ' + outputFile, hasMinify);

    var pathDir = path.dirname(outputFile);
    if (!fileExist(pathDir)) fs.mkdirSync(pathDir);

    log += '\r\n[' + (i + 1).toString() + '] ' + outputFile + ': \r\n';

    var __minify = function (file, isMinify) {
        //console.log(file);

        if (file == null || file.length == 0) {
            log + '\t\t> NOT_FIND_EMPTY: ' + file + '\r\n';
            return;
        }

        if (file.startsWith(___commentKey)) {
            log + '\t\t> BREAK_COMMENT: ' + file + '\r\n';
            return;
        }

        if (!fileExist(file)) {
            notFind += '\r\n' + file;
            log + '\t\t> NOT_FIND: ' + file + '\r\n';
            return;
        }


        var fileName = path.basename(file),
            code = fs.readFileSync(file, 'utf8');

        if (file.toLowerCase().endsWith('.js')) {
            if (isMinify == false || file.toLowerCase().endsWith('.min.js')) {
                s += '\r\n\r\n /*[ ' + fileName + ' ]*/ \r\n' + code;
                log += '\t> OK:\t  ' + file + '\r\n';
            } else {
                const min = UglifyJS.minify(code);
                if (min.error) {
                    s += '\r\n\r\n /*[ ' + fileName + ' ] \r\n\r\n' + min.error + ' \r\n */ \r\n\r\n';
                    log += '\t> ERROR_MIN: ' + min.error + '\r\n';
                } else {
                    s += '\r\n\r\n /*[ ' + fileName + ' ]*/ \r\n' + min.code;
                    log += '\t> OK_MIN: ' + file + '\r\n';
                }
            }
            //continue;
            return;
        }

        if (file.toLowerCase().endsWith('.css')) {
            if (isMinify == false || file.toLowerCase().endsWith('.min.css')) {
                s += '\r\n\r\n /*[ ' + fileName + ' ]*/ \r\n' + code;
                log += '\t> OK:\t  ' + file + '\r\n';
            } else {
                const min = new CleanCSS({}).minify(code);
                if (min.errors && min.errors.length > 0) {
                    const errText = JSON.stringify(min.errors);
                    s += '\r\n\r\n /*[ ' + fileName + ' ] \r\n\r\n' + errText + ' \r\n */ \r\n\r\n';
                    log += '\t> ERROR_MIN: ' + errText + '\r\n';
                } else {
                    s += '\r\n\r\n /*[ ' + fileName + ' ]*/ \r\n' + min.styles;
                    log += '\t> OK_MIN: ' + file + '\r\n';
                }
            }
        }
    };

    for (let j = 0; j < inputs.length; j++)
        __minify(inputs[j], hasMinify);

    if (fileExist(dirFiles)) {
        fs.readdirSync(dirFiles).forEach(function (file) {
            __minify(dirFiles + file, hasMinify);
        })
    }

    if (outputFile.endsWith('.js'))
        s += '\r\n if (typeof window["' + outputFile + '"] == "function") window["' + outputFile + '"](); console.log("' + outputFile + ' loaded ...");';

    fileOutput = fileFormatPath(minifyPathOutput + '/' + outputFile);
    fileOutputCopy = minifyPathOutputCopy.length > 0 ? fileFormatPath(minifyPathOutputCopy + '/' + outputFile) : '';
    
    const err_ = fs.writeFileSync(fileOutput, s);
    if (err_) log += '\n\t====> ERROR: ' + err_ + '\r\n';
    log += '\n\t====> COPY: ' + fileOutputCopy + '\r';
    log += '\n\t====> DONE: ' + fileOutput + '\r\n';

    if (fileOutputCopy.length > 0) fs.writeFileSync(fileOutputCopy, s);

    log += '\r\n-----------------------\r\n';
    console.log(log);
}

fileOutput = fileFormatPath(minifyPathOutput + '/Error.txt');
fs.writeFileSync(fileOutput, 'ERROR NOT FIND: \r\n' + notFind + '\r\n-------------\r\n');
fileOutputCopy = minifyPathOutputCopy.length > 0 ? fileFormatPath(minifyPathOutputCopy + '/Error.txt') : '';
if (fileOutputCopy.length > 0) fs.writeFileSync(fileOutputCopy, 'ERROR NOT FIND: \r\n' + notFind + '\r\n-------------\r\n');

fileOutput = fileFormatPath(minifyPathOutput + '/Log.txt');
fs.writeFileSync(fileOutput, dformat + ' - Type: ' + _type + '\r\n\r\n' + log);
fileOutputCopy = minifyPathOutputCopy.length > 0 ? fileFormatPath(minifyPathOutputCopy + '/Log.txt') : '';
var d = new Date, dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
if (fileOutputCopy.length > 0) fs.writeFileSync(fileOutputCopy, dformat + ' - Type: ' + _type + '\r\n\r\n' + log);

//console.log(arr);
console.log('> COMPLETE MINIFY ......');
console.log('> ...');