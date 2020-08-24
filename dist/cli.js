"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
function cli() {
    // handle args
    let argv = process.argv.slice(2);
    const isHelp = argv.includes('-h') || argv.includes('--help');
    argv = argv.filter(v => !/^(-h|--help)/.test(v));
    let cmd = !isHelp && argv.shift();
    if (cmd)
        cmd = cmd.toLowerCase();
    if (isHelp) {
        const help = `
    Titere
    Commands:
      inline <url|string>                     Generate single PDF from URL or HTML string, 
                                                returned as Buffer.
      store <batch> [filename|(url|string)]   Generate and store PDFs to location. Matching 
                                                array of results returned.
      clean <batch> <?pattern>                Clean up directory of stored PDFs. Optionally,
                                                pass pattern of which files to remove.
    Options:
      -h, --help    displays help.
    `;
        console.log(help);
        process.exit();
    }
    if (!cmd) {
        process.stderr.write(`A command to run must be specified.`, 'utf-8');
        process.exit();
    }
    ///////////////////////////////
    // INLINE
    ///////////////////////////////
    if (cmd === 'inline') {
        const urlOrHtml = argv.shift();
        // can only accept one incoming param, all others ignored
        if (!urlOrHtml) {
            process.stderr.write('A URL or string of HTML must be specified.', 'utf-8');
            process.exit();
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            const buf = yield api_1.inline(urlOrHtml);
            if (buf) {
                process.stdout.write(buf, 'utf-8');
                process.exit();
            }
            else {
                process.stderr.write('PDF could not be created.\n', 'utf-8');
                process.exit();
            }
        }))();
    }
    ///////////////////////////////
    // CLEAN
    ///////////////////////////////
    else if (cmd === 'clean') {
        const batch = argv.shift();
        let pattern = argv.shift();
        if (!batch) {
            process.stderr.write('A batch identifier string must be specified.', 'utf-8');
            process.exit();
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            const didClean = yield api_1.clean(batch, pattern);
            if (didClean) {
                process.stdout.write(`Requested files from ${batch} batch removed.\n`, 'utf-8');
                process.exit();
            }
            else {
                process.stderr.write('Files could not be removed.\n', 'utf-8');
                process.exit();
            }
        }))();
    }
    ///////////////////////////////
    // STORE
    ///////////////////////////////
    else if (cmd === 'store') {
        const batch = argv.shift();
        if (!batch) {
            process.stderr.write('A batch identifier string must be specified.', 'utf-8');
            process.exit();
        }
        if (!argv.length) {
            process.stderr.write('No files were specified to generate PDFs.', 'utf-8');
            process.exit();
        }
        // get files objs set up, if args weren't formatted correctly, error from here to skip them
        let files = [...argv].map((arg, i) => {
            const parts = arg.split('|', 2);
            // do we need to check anything else?
            if (parts.length === 2) {
                return {
                    refId: '',
                    filename: parts[0],
                    urlOrHtml: parts[1],
                    failed: false,
                    result: '',
                };
            }
            return {
                refId: '',
                filename: '',
                urlOrHtml: '',
                failed: true,
                result: `Incorrect format at arg index: ${i}`,
            };
        });
        // proceed to generation
        (() => __awaiter(this, void 0, void 0, function* () {
            // will throw error if global failure like can't get puppeteer instance
            try {
                files = yield api_1.store(batch, files);
                process.stdout.write(JSON.stringify(files), 'utf-8');
                process.exit();
            }
            catch (err) {
                process.stderr.write(err.message, 'utf-8');
                process.exit();
            }
        }))();
    }
}
const instance = cli();
exports.default = instance;
//# sourceMappingURL=cli.js.map