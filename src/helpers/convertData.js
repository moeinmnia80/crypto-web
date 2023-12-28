const convertData = (data, type) => {
  return data[type].map((item) => {
    const date = new Date(item[0]);
    return {
      date: date.toLocaleDateString(),
      [type]: item[1],
    };
  });
};

export default convertData;
