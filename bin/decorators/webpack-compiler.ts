import * as webpack from 'webpack';
import * as _debug from 'debug';

const debug = _debug('app:webpack:compiler');

function helperFn() {
  console.log('hello');
};

interface CustomCompiler extends webpack.compiler.Compiler {
  helperFn: () => void;
  plugin: (plugin: string, callback: (response?: any) => void) => void;
}

export default (compiler: webpack.compiler.Compiler): CustomCompiler => {
  const decorated = compiler as CustomCompiler;
  const name = decorated.name;

  decorated.plugin('compile', function (response) {
    debug(`\n  🛠  ${name ? name + ' ' : ''}webpack building...`);
  });

  decorated.plugin('done', function (stat: webpack.compiler.Stats) {
    debug(`\n  🛠  ${name ? name + ' ' : ''}HOOK...`);
  });


  decorated.helperFn = helperFn;
  return decorated;
};