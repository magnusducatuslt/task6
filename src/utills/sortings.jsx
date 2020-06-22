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
    if (property === "action") {
      template[property] = obj.property;
    }
    return template;
  });
};
