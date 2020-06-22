import React from "react";

export const localStorageApi = ({ arr }) => {
  const container = arr.reduce(
    (obj, elem) => {
      obj.status = false;
      const values = localStorage.getItem(elem);
      obj.message[elem] = null;
      if (values) {
        obj.message[elem] = JSON.parse(values);
        obj.status = true;
      }
      return obj;
    },
    {
      status: false,
      message: {},
    }
  );
  return container;
};
// useEffect(() => {
//   const newContainer = arr.reduce((obj, elem) => {
//     const values = localStorage.getItem(elem);
//     obj[elem] = null;
//     if (values) {
//       obj[elem] = JSON.parse(values);
//     }
//     return obj;
//   }, {});
//   setContainer({ ...newContainer });
// }, []);
