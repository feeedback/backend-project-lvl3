const parseUrl = async (url) => {
  const [, urlWithoutProtocol] = url.split('://');
  const fileName = `${urlWithoutProtocol.replace(/[^A-Za-z0-9]/g, '-')}.html`;
  // const filepath = path.resolve(process.cwd(), fileName);
  return fileName;
};

export default parseUrl;
