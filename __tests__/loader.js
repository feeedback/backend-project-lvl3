import { promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import { test, expect, beforeEach } from '@jest/globals';
import nock from 'nock';
import { createFixturesFilePath } from '../src/utils.js';
import loadHtmlFromUrl from '../src/loader.js';

nock.disableNetConnect();

const filepathJsonA = createFixturesFilePath('json/file_deep1.json');
// const filepathJsonB = createFixturesFilePath('json/file_deep2.json');

let TEMP_DIR_PATH_BASE = null;
beforeEach(async () => {
  TEMP_DIR_PATH_BASE = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('1', async () => {
  const url = 'https://ru.hexlet.io/courses';

  const { pathname } = new URL(url);

  const urlParts = new URL(url);
  urlParts.pathname = '/';
  urlParts.search = '';
  console.log(urlParts.toString());

  const fileDataMockJsonA = JSON.parse(await fsp.readFile(filepathJsonA, 'utf-8'));

  nock(urlParts.toString()).persist().get(pathname).reply(200, fileDataMockJsonA);

  const filepath = await loadHtmlFromUrl(url, TEMP_DIR_PATH_BASE);

  const fileData = JSON.parse(await fsp.readFile(filepath, 'utf-8'));

  expect(fileData).toStrictEqual(fileDataMockJsonA);
});
