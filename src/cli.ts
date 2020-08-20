import { inline, clean, store } from './api';
import { IFile } from './types';

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
    return;
  }

  if (!cmd) {
    process.stderr.write(`A command to run must be specified.`, 'utf-8');
    return;
  }

  ///////////////////////////////
  // INLINE
  ///////////////////////////////

  if (cmd === 'inline') {

    const urlOrHtml = argv.shift();

    // can only accept one incoming param, all others ignored
    if (!urlOrHtml) {
      process.stderr.write('A URL or string of HTML must be specified.', 'utf-8');
      return;  
    }

    (async () => {

      const buf = await inline(urlOrHtml);

      if (buf)
        process.stdout.write(buf, 'utf-8');
      else
        process.stderr.write('PDF could not be created.\n', 'utf-8');

    })();

  }

  ///////////////////////////////
  // CLEAN
  ///////////////////////////////

  else if (cmd === 'clean') {

    const batch = argv.shift();
    let pattern = argv.shift();

    if (!batch) {
      process.stderr.write('A batch identifier string must be specified.', 'utf-8');
      return;  
    }

    (async () => {

      const didClean = await clean(batch, pattern);

      if (didClean)
        process.stdout.write(`Requested files from ${batch} batch removed.\n`, 'utf-8');
      else
        process.stderr.write('Files could not be removed.\n', 'utf-8');

    })();

  }

  ///////////////////////////////
  // STORE
  ///////////////////////////////

  else if (cmd === 'store') {

    const batch = argv.shift();
    
    if (!batch) {
      process.stderr.write('A batch identifier string must be specified.', 'utf-8');
      return;  
    }

    if (!argv.length) {
      process.stderr.write('No files were specified to generate PDFs.', 'utf-8');
      return;  
    }

    // get files objs set up, if args weren't formatted correctly, error from here to skip them
    let files: IFile[] = [...argv].map((arg, i) => {
      const parts = arg.split('|', 2);
      // do we need to check anything else?
      if (parts.length === 2) {
        return {
          refId: '',
          filename: parts[0],
          urlOrHtml: parts[1],
          failed: false, // not generated yet
          result: '', // placeholder, no error yet
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
    (async () => {

      // will throw error if global failure like can't get puppeteer instance
      try {
        files = await store(batch, files);
        process.stdout.write(JSON.stringify(files), 'utf-8');
      }

      catch (err) {
        process.stderr.write(err.message, 'utf-8');
      }

    })();

  }

}

const instance = cli();
export default instance;
