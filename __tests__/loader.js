import { promises as fsp } from 'fs';
import os from 'os';
import path from 'path';

import { test, expect, beforeEach } from '@jest/globals';
import nock from 'nock';
import { createFixturesFilePath } from '../src/utils.js';
import loadHtmlFromUrl from '../src/loader.js';
import parseUrl from '../src/parse_url.js';

nock.disableNetConnect();

const filepathJsonA = createFixturesFilePath('json/file_deep1.json');
// const filepathJsonB = createFixturesFilePath('json/file_deep2.json');

let tempDirPath = null;
beforeEach(async () => {
  tempDirPath = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});
// const mockBody = JSON.parse('{"name": "LICENSE.md", "path": "LICENSE.md", "sha": "186041e2408e80287344300496fdae279c27ed24", "size": 1060, "url": "https://api.github.com/repos/atom/atom/contents/LICENSE.md?ref=master", "html_url": "https://github.com/atom/atom/blob/master/LICENSE.md", "git_url": "https://api.github.com/repos/atom/atom/git/blobs/186041e2408e80287344300496fdae279c27ed24", "download_url": "https://raw.githubusercontent.com/atom/atom/master/LICENSE.md", "type": "file", "content": "Q29weXJpZ2h0IChjKSAyMDExLTIwMjEgR2l0SHViIEluYy4KClBlcm1pc3Np\\nb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkg\\ncGVyc29uIG9idGFpbmluZwphIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQg\\nYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUKIlNvZnR3YXJl\\nIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rp\\nb24sIGluY2x1ZGluZwp3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0\\nbyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsCmRpc3RyaWJ1\\ndGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29m\\ndHdhcmUsIGFuZCB0bwpwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0\\nd2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8KdGhlIGZv\\nbGxvd2luZyBjb25kaXRpb25zOgoKVGhlIGFib3ZlIGNvcHlyaWdodCBub3Rp\\nY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUKaW5jbHVk\\nZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0\\naGUgU29mdHdhcmUuCgpUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgIkFTIElT\\nIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwKRVhQUkVTUyBPUiBJ\\nTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJS\\nQU5USUVTIE9GCk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJU\\nSUNVTEFSIFBVUlBPU0UgQU5ECk5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZF\\nTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUK\\nTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklM\\nSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTgpPRiBDT05UUkFDVCwgVE9SVCBP\\nUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5F\\nQ1RJT04KV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBE\\nRUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuCg==\\n", "encoding": "base64", "_links": { "self": "https://api.github.com/repos/atom/atom/contents/LICENSE.md?ref=master", "git": "https://api.github.com/repos/atom/atom/git/blobs/186041e2408e80287344300496fdae279c27ed24", "html": "https://github.com/atom/atom/blob/master/LICENSE.md" }, "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT", "url": "https://api.github.com/licenses/mit", "node_id": "MDc6TGljZW5zZTEz" } }');

test('1', async () => {
  const baseUrl = 'https://api.github.com:443';
  const url = '/repos/atom/atom/license';
  const fullUrl = baseUrl + url;
  const filePath = await parseUrl(fullUrl);
  const pathFull = path.join(tempDirPath, filePath);

  nock(baseUrl).persist().get(url).reply(200, filepathJsonA);

  await loadHtmlFromUrl(fullUrl, pathFull);

  const fileData = JSON.parse(await fsp.readFile(pathFull, 'utf-8'));

  expect(fileData).toStrictEqual(filepathJsonA);
});
