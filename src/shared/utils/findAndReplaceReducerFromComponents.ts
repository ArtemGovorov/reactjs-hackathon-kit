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

export const findAsyncReducer = (components) => {
  // Find inner most component with a reducer
  const component = ([...components] as any)
    .reverse()
    .find(component => component && component.injectReducer)

  if (component) {
    return component.injectReducer;
  }

  return component;

};

export default findAndReplaceReducerFromComponents;