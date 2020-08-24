import puppeteer from 'puppeteer';
import rimraf from 'rimraf';
import { ensureDir } from 'fs-extra';
import { join } from 'path';
import pMap from 'p-map';
import { isUrl, isHtml } from './utils';
import { IFile } from './types';

// set up dir
const cwd = join(process.cwd(), 'pdfs');

/**
 * Generate single PDF from URL or HTML string, returning Buffer
 * for immediate display or usage.
 * 
 * @param  {string} urlOrHtml
 * @returns Promise<Buffer>
 */
export async function inline(urlOrHtml: string): Promise<Buffer> {

  const URL_INVOICE = process.env.URL_INVOICE;

  if (!URL_INVOICE) {
    process.stderr.write('URL_INVOICE ENV variable is missing!', 'utf-8');
    process.exit();
  }  

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (isUrl(urlOrHtml))
      await page.goto(urlOrHtml);
    else if (isHtml(urlOrHtml))
      await page.setContent(urlOrHtml);
    else {
      // must be token
      const url = URL_INVOICE + urlOrHtml;
      await page.goto(url);
    }

    const buf: Buffer = await page.pdf();
    
    return buf;
  }

  catch (err) {
    // if we're here, then we couldn't launch Puppeteer or something bad happened
    throw new Error('Whoops, couldn\'t launch Puppeteer!');
  }

}

/**
 * Remove previously generated PDF file(s) and batch directory
 * 
 * @param  {string} batch
 * @param  {string} pattern?
 * @returns Promise<boolean>
 */
export async function clean(batch: string, pattern?: string): Promise<boolean> {
  return new Promise(resolve => {

    if (!pattern) {
      // remove entire batch dir
      rimraf(`${cwd}/${batch}`, (err: Error) => {
        if (err) resolve(false);
        resolve(true);
      });
    }
    else {
      pattern = pattern.replace(/^\//, '');
      rimraf(`${cwd}/${batch}/${pattern}`, (err: Error) => {
        if (err) resolve(false);
        resolve(true);
      });
    }
    
  });
}

/**
 * Generate PDF files, then stored locally in a batch directory
 * 
 * @param  {string} batch
 * @param  {IFile[]} files
 * @returns Promise<IFile[]>
 */
export async function store(batch: string, files: IFile[]): Promise<IFile[]> {

  // set up batch dir, this will add any missing dirs in path, too
  try {
    await ensureDir(join(cwd, batch));
  }
  catch (err) {
    throw new Error(`Couldn't create batch directory at: ${join(cwd, batch)}`);
  }

  try {
    const browser = await puppeteer.launch();

    const mapper = async (file: IFile) => {
      // catch any errors in each iteration since we want
      // to always resolve from here, so the pMap results is 
      // just a resolved array of the file objects with results,
      // whether they be errors or successful
      try {
        const page = await browser.newPage();

        if (isUrl(file.urlOrHtml))
          await page.goto(file.urlOrHtml);
        else
          await page.setContent(file.urlOrHtml);

        await page.pdf({ path: `${cwd}/${batch}/${file.filename}.pdf` });

        // return back updated object to pMap results
        return {
          ...file,
          success: true,
          result: `${file.filename} created successfully.`
        };
      }
      catch (err) {
        console.log(err.message);
        // at this point not breaking this up, we caught an error
        // from one of the steps above, not sure which, but it failed
        return {
          ...file,
          result: 'ERROR: There was a problem generating the PDF.'
        };
      }
    };

    // no need to process ones that already failed from arg checks
    const alreadyFailed = files.filter(f => f.failed);
    let mappedFiles = files.filter(f => !f.failed);

    mappedFiles = await pMap(mappedFiles, mapper, { concurrency: 3 });

    return [...alreadyFailed, ...mappedFiles];
    
  }

  catch (err) {
    // if we're here, then we couldn't launch Puppeteer
    throw new Error('Whoops, couldn\'t launch Puppeteer!');
  }

}
