/// <reference types="node" />
import { IFile } from './types';
/**
 * Generate single PDF from URL or HTML string, returning Buffer
 * for immediate display or usage.
 *
 * @param  {string} urlOrHtml
 * @returns Promise<Buffer>
 */
export declare function inline(urlOrHtml: string): Promise<Buffer | false>;
/**
 * Remove previously generated PDF file(s) and batch directory
 *
 * @param  {string} batch
 * @param  {string} pattern?
 * @returns Promise<boolean>
 */
export declare function clean(batch: string, pattern?: string): Promise<boolean>;
/**
 * Generate PDF files, then stored locally in a batch directory
 *
 * @param  {string} batch
 * @param  {IFile[]} files
 * @returns Promise<IFile[]>
 */
export declare function store(batch: string, files: IFile[]): Promise<IFile[]>;
