
import * as  ReactDOMServer from 'react-dom/server';
import * as Helmet from 'react-helmet';

import config from '../../../helmet.config';

// Remove stylesheets because we do not extract them into a css file
// in development mode
if (__DEVSERVER__) {
  config.link = config.link.filter(l => l.rel !== 'stylesheet');
}

const Meta = () => (
  <Helmet
    //htmlAttributes={{ 'lang': 'en', 'amp': undefined }}
    title='React Webpack Node' meta={config.meta}
    link={config.link}
    />
);


ReactDOMServer.renderToString(<Meta />);
const HelmetData: ReactHelmet.HelmetData = Helmet.rewind();

export  {HelmetData};
