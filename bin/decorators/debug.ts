import * as _debug from 'debug';
export default (namespace: string, emoji) => {
  const debug = _debug(namespace);
  return (...args: any[]) => {
    args.push('\n');
    debug(`\n  ${emoji}  %s`, ...args.map(
      arg =>  preetfy(String(arg))
    ));
  };
};

function preetfy(str) {
  return str.replace(/\n/g, '\n  ');
}
