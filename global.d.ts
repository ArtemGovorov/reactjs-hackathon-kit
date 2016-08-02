/// <reference path="node_modules/rxjs/Rx.d.ts" />

declare var __BASENAME__: string;
declare var __DEVTOOLS__: boolean;

declare var __DEVSERVER__: boolean;
declare var __DEVCLIENT__: boolean;
declare var __CLIENT__: boolean;


declare var expect: Chai.ExpectStatic;
declare var should: Chai.Should;



declare namespace NodeJS {
  export interface Global {
    When: any;
    Parse: any;
    chai: any;
    sinon: any;
    expect: any;
    should: any;
    Rx: any;
  }
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

interface Window {
  __INITIAL_STATE__: string;
  devToolsExtension: {
    (): void;
    open: () => void
  };
}

interface NodeModule {
  hot: {
    accept: (a: string | Array<any>, b: Function) => void;
  };
}

interface NodeRequireFunction {
  ensure: any;
  context: any;
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare module 'react-hot-loader' {
  const ReactHotLoader: any;
  const AppContainer: any;
  export {
  AppContainer
  };
  export default ReactHotLoader;
}

declare module 'redux-observable' {
  const ActionsObservable: (actions: any) => void;
  const reduxObservable: (processor?: any) => void;
  export {
  ActionsObservable,
  reduxObservable
  }
}

declare module 'serialize-javascript' {
  const SerializeJavascript: {
    (obj: any): string
  };
  export = SerializeJavascript;
}


declare module 'extract-text-webpack-plugin' {
  const ExtractTextPlugin: any;
  export default ExtractTextPlugin;
}

declare module 'inline-environment-variables-webpack-plugin' {
  const InlineEnviromentVariablesPlugin: any;
  export default InlineEnviromentVariablesPlugin;
}

declare module 'express-flash' {
  const ExpressFlash: any;
  export default ExpressFlash;
}

declare module 'isomorphic-style-loader/lib/withStyles' {
  const withStyles: any;
  export default withStyles;
}



