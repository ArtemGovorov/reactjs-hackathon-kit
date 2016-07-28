import { injectReducer } from '../store/reducers';

const findAndReplaceReducerFromComponents = (components, store) => {
  const innermostComponentWithReducer = ([...components] as any)
    .reverse()
    .find(component => component && component.injectReducer);

  if (innermostComponentWithReducer) {
    //console.log(innermostComponentWithReducer.displayName + ' has a reducer. replacing.');
    injectReducer(store, innermostComponentWithReducer.injectReducer);

  }
};

export default findAndReplaceReducerFromComponents;