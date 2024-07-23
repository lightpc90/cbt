export const updatedList = (prev, newData) => {
  return prev.map((eachExistingCourse) =>
    eachExistingCourse._id === newData._id ? newData : eachExistingCourse
  );
};
