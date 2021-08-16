#!/usr/bin/env node

import commander from 'commander';
import pageLoader from '../src/loader.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Download page and save to file system drive')
  .option('-o, --output [path]', 'output dir path', process.cwd())
  .arguments('<url>')
  .action((url) => pageLoader(url, program.output)
    .then((path) => console.log(`\nSaved page ${path}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    }))
  .parse(process.argv);
