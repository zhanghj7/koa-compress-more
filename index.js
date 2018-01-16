'use strict'

const compress = require('koa-compress');
const fse  = require('fs-extra');
const path = require('path');


module.exports = modifyCompress;

function modifyCompress(arr, options) {
    let dir = path.join('node_modules', 'compressible', 'node_modules', 'mime-db', 'db.json');
    let data = fse.readJSONSync(dir);
    for (let key in data) {
        for (let item of arr) {
            if (key == item) {
                data[key]['compressible'] = true;
            }
        }
    }
    fse.writeJSONSync(dir, data);
    return compress(options);
}