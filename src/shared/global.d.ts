/// <reference path="../../node_modules/rxjs/Rx.d.ts" />

declare var __BASENAME__: string;
declare var __DEV__: string;
declare var __DEVTOOLS__: string;

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}


interface Window {
  __data: string;
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
  const ActionsObservable: () => void;
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