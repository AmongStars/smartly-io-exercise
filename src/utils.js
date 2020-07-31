export const getRandomElements = (items, size) => {
  const randomElements = [];
  for (let i = 0; i < size; i++) {
    while (true) {
      const index = Math.floor(Math.random() * items.length);
      const randomItem = items[index];
      const alreadyExists = randomElements.some(
        (item) => item._id === randomItem._id
      );
      if (!alreadyExists) {
        randomElements.push(randomItem);
        break;
      }
    }
  }
  return randomElements;
};

export const getRowData = (item) => {
  const id = item._id;
  if (!id) {
    return null;
  }

  const name = item?.user?.name;
  if (!name) {
    return null;
  }

  const { first, last } = name;
  if (!first && !last) {
    return null;
  }

  const { text } = item;
  if (!text) {
    return null;
  }

  const user = `${first} ${last}`.trim();

  return {
    id,
    user,
    text,
  };
};
