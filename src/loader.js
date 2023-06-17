import { promises as fsp } from 'fs';
import path from 'path';
import axios from 'axios';
import parseUrl from './parse_url';

const loader = async (url, pathBase) => {
  console.log({ url, pathBase });

  const filename = await parseUrl(url);
  const filepath = path.resolve(pathBase, filename);

  console.log({ url, filepath });
  const response = await axios.get(url);
  console.log({ data: response.data, url, filepath });

  fsp
    .writeFile(filepath, JSON.stringify(response.data))
    .then(() => console.log('файл записан'))
    .catch(console.log);
  return filepath;
};

export default loader;
