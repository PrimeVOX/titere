require('dotenv').config();
import cli from './cli';
export * from './api';
export * from './types';

(() => { cli(); })();
