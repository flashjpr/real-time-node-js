function printHelp() {
    console.log(`
        1.js (c) Alex
        
        usage:
        --help       print this help
        --file       read the file of {NAME} and output it
    `);
}

var args = require('minimist')(process.argv.slice(2), {string: 'file'});


if (args.help || !args.file) {
    printHelp();
    process.exit(1)
}

let hello = require('./helloworld.js');

hello.say(args.file, function (error, contents) {
    if (error) {
        console.log('Error: ' + error)
    } else {
        console.log(contents.toString());
    }
});