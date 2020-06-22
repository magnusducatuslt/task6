export const returnMeUnForbiddenLinks = ({ container, forbidden }) => {
  return container.filter((route) =>
    forbidden.find((restricted) => {
      return route.name === restricted ? true : false;
    })
      ? false
      : true
  );
};
export const returnMeNewObjectWithOutParams = ({ obj, excluders }) => {
  return Object.keys(obj).reduce((template, property) => {
    if (!excluders.find((excluder) => (excluder === property ? true : false))) {
      template[property] = obj[property];
    }
    return template;
  }, {});
};
export const returnMeNewArrayWithOutParams = ({ arr, excluders }) => {
  return arr.reduce((container, property) => {
    if (!excluders.find((excluder) => (excluder === property ? true : false))) {
      container.push(property);
    }
    return container;
  }, []);
};
export const returnMeCreatedObjectFromArrayWithoutParams = ({
  arr,
  excluders,
}) => {
  return arr.reduce((container, property) => {
    if (!excluders.find((excluder) => (excluder === property ? true : false))) {
      container[property] = "";
    }
    return container;
  }, {});
};
