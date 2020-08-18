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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.clean = exports.inline = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const rimraf_1 = __importDefault(require("rimraf"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const p_map_1 = __importDefault(require("p-map"));
const utils_1 = require("./utils");
// set up dir
const cwd = path_1.join(process.cwd(), 'pdfs');
fs_extra_1.ensureDirSync(cwd);
/**
 * Generate single PDF from URL or HTML string, returning Buffer
 * for immediate display or usage.
 *
 * @param  {string} urlOrHtml
 * @returns Promise<Buffer>
 */
function inline(urlOrHtml) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            if (utils_1.isUrl(urlOrHtml))
                yield page.goto(urlOrHtml);
            else
                yield page.setContent(urlOrHtml);
            const buf = yield page.pdf();
            return buf;
        }
        catch (err) {
            return undefined;
        }
    });
}
exports.inline = inline;
/**
 * Remove previously generated PDF file(s) and batch directory
 *
 * @param  {string} batch
 * @param  {string} pattern?
 * @returns Promise<boolean>
 */
function clean(batch, pattern) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            if (!pattern) {
                // remove entire batch dir
                rimraf_1.default(`${cwd}/${batch}`, (err) => {
                    if (err)
                        resolve(false);
                    resolve(true);
                });
            }
            else {
                pattern = pattern.replace(/^\//, '');
                rimraf_1.default(`${cwd}/${batch}/${pattern}`, (err) => {
                    if (err)
                        resolve(false);
                    resolve(true);
                });
            }
        });
    });
}
exports.clean = clean;
/**
 * Generate PDF files, then stored locally in a batch directory
 *
 * @param  {string} batch
 * @param  {IFile[]} files
 * @returns Promise<IFile[]>
 */
function store(batch, files) {
    return __awaiter(this, void 0, void 0, function* () {
        // set up batch dir
        fs_extra_1.ensureDirSync(cwd + '/' + batch);
        try {
            const browser = yield puppeteer_1.default.launch();
            const mapper = (file) => __awaiter(this, void 0, void 0, function* () {
                // catch any errors in each iteration since we want
                // to always resolve from here, so the pMap results is 
                // just a resolved array of the file objects with results,
                // whether they be errors or successful
                try {
                    const page = yield browser.newPage();
                    if (utils_1.isUrl(file.urlOrHtml))
                        yield page.goto(file.urlOrHtml);
                    else
                        yield page.setContent(file.urlOrHtml);
                    yield page.pdf({ path: `${cwd}/${batch}/${file.filename}.pdf` });
                    // return back updated object to pMap results
                    return Object.assign(Object.assign({}, file), { success: true, result: `${file.filename} created successfully.` });
                }
                catch (err) {
                    console.log(err.message);
                    // at this point not breaking this up, we caught an error
                    // from one of the steps above, not sure which, but it failed
                    return Object.assign(Object.assign({}, file), { result: 'ERROR: There was a problem generating the PDF.' });
                }
            });
            // no need to process ones that already failed from arg checks
            const alreadyFailed = files.filter(f => f.failed);
            let mappedFiles = files.filter(f => !f.failed);
            mappedFiles = yield p_map_1.default(mappedFiles, mapper, { concurrency: 3 });
            return [...alreadyFailed, ...mappedFiles];
        }
        catch (err) {
            // if we're here, then we couldn't launch Puppeteer
            throw new Error('Whoops, couldn\'t launch Puppeteer!');
        }
    });
}
exports.store = store;
//# sourceMappingURL=api.js.map