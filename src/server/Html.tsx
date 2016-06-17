import * as  React from 'react';
import * as  ReactDOM from 'react-dom/server';
import { Component } from 'react';
import * as serialize from 'serialize-javascript';
import * as Helmet from 'react-helmet';

export interface Props extends React.Props<any> {
  assets: any;
  component: any;
  store: any;
}

export default class Html extends Component<Props, any> {

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent() }
          {head.title.toComponent() }
          {head.meta.toComponent() }
          {head.link.toComponent() }
          {head.script.toComponent() }
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='stylesheet' href='${assets.main.css}'/>
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(store.getState())};`
            }} charSet='UTF-8'
            />
     /*     <script src={assets.javascript.vendor} charSet='UTF-8' />
          <script src={assets.javascript.main} charSet='UTF-8' />*/
        </body>
      </html>
    );
  }
}
