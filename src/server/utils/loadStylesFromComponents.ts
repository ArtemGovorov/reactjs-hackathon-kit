function loadStylesFromComponents(components) {
  const stylesOfComponents = components
    .filter(component => component && !!component.styles)
    .map(component => component.styles);

  // use a map to remove duplicate module ids
  const stylesMap = {};
  stylesOfComponents.forEach(componentStyles => {
    componentStyles.forEach(componentStyle => {
      componentStyle.forEach(([moduleId, styleContent]) => stylesMap[moduleId] = styleContent);
    });
  });
  const values = [];
  for (let key in stylesMap) {
    values.push(stylesMap[key]);
  }
  const result = values.reduce((prev, cur) => prev + '\n\n' + cur, '');
  return result;
}

export default loadStylesFromComponents;