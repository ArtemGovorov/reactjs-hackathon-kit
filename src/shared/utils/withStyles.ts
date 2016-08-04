import withStyles from 'isomorphic-style-loader/lib/withStyles';

export default function (styles: any) {

  if (process.env.NODE_ENV === 'test') {
    return component => component;
  } else {
    return component => withStyles(styles)(component);
  };

}


