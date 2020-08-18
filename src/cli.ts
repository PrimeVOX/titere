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
    process.exit();
  }

  if (!cmd) {
    console.error(`A command to run must be specified.`);
    process.exit();
  }

  ///////////////////////////////
  // INLINE
  ///////////////////////////////

  if (cmd === 'inline') {

    const urlOrHtml = argv.shift();

    // can only accept one incoming param, all others ignored
    if (!urlOrHtml) {
      console.error('A URL or string of HTML must be specified.');
      process.exit();  
    }

    (async () => {

      const buf = await inline(urlOrHtml);

      if (buf)
        process.stdout.write(buf);
      else
        process.stderr.write('PDF could not be created.\n');

      process.exit();

    })();

  }

  ///////////////////////////////
  // CLEAN
  ///////////////////////////////

  else if (cmd === 'clean') {

    const batch = argv.shift();
    let pattern = argv.shift();

    if (!batch) {
      console.error('A batch identifier string must be specified.');
      process.exit();  
    }

    (async () => {

      const didClean = await clean(batch, pattern);

      if (didClean)
        process.stdout.write(`Requested files from ${batch} batch removed.\n`);
      else
        process.stderr.write('Files could not be removed.\n');

      process.exit();

    })();

  }

  ///////////////////////////////
  // STORE
  ///////////////////////////////

  else if (cmd === 'store') {

    const batch = argv.shift();
    
    if (!batch) {
      console.error('A batch identifier string must be specified.');
      process.exit();  
    }

    if (!argv.length) {
      console.error('No files were specified to generate PDFs.');
      process.exit();  
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
        process.stdout.write(JSON.stringify(files));
      }

      catch (err) {
        process.stderr.write(err.message);
      }

      process.exit();

    })();

  }

}

const instance = cli();
export default instance;
