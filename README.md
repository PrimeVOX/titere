CLI and lib for Puppeteer

## CLI

### `inline`

```sh
$ node ./ inline <url|string>
```

You can pass any URL or a complete string of HTML to this command and the PDF will be returned as a Buffer

Only one argument is processed and any other arguments will be ignored.

### `store`

```sh
$ node ./ store <batch> [filename|<url|string>]
```

Batch must be specified as a string.  This makes cleanup easier.

Pass as many arguments as desired.  Titere makes no assumptions as to filenames, so you must specify the filename followed by the URL or HTML string, the two parts separated by a pipe character.

### `clean`

```sh
$ node ./ clean <batch> <?pattern>
```

Easily remove an entire batch of files by specifying the batch name.  If you need more control over which files are removed and when, you can optionally pass a string pattern to apply to that batch directory, removing only the file names that match.

## Library functions

The following functions are exported directly.

### `inline`

```ts
/**
 * Generate single PDF from URL or HTML string, returning Buffer
 * for immediate display or usage.
 * 
 * @param  {string} urlOrHtml
 * @returns Promise<Buffer>
 */
```

### `store`

```ts
/**
 * Generate PDF files, then stored locally in a batch directory
 * 
 * @param  {string} batch
 * @param  {IFile[]} files
 * @returns Promise<IFile[]>
 */
```

### `clean`

```ts
/**
 * Remove previously generated PDF file(s) and batch directory
 * 
 * @param  {string} batch
 * @param  {string} pattern?
 * @returns Promise<boolean>
 */
```
