import { promises as fsp } from 'fs';
import path from 'path';
import axios from 'axios';
// import { URL } from 'url';

const loader = async (url, pathFull) => {
  // const myURL = new URL(url);
  // console.log(myURL.protocol);
  // const filepath = path.resolve(process.cwd(), fileName);
  const filepath = path.resolve(pathFull);

  const response = await axios.get(url);

  // console.log({ data: response.data });
  fsp
    .writeFile(filepath, JSON.stringify(response.data))
    .then(() => console.log('файл записан'))
    .catch(console.log);
};

export default loader;
// (async function xs() {
//   await getDifferenceTwoFile('https://ru.hexlet.io/courses');
// })();
