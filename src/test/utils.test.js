import { getRandomElements } from "../utils";

describe("utils", () => {
  describe("getRandomElements", () => {
    test("positive size", () => {
      const SIZE = 5;
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const randomElements = getRandomElements(items, SIZE);

      expect(randomElements.length).toBe(SIZE);
    });

    test("negative size", () => {
      const SIZE = -5;
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const randomElements = getRandomElements(items, SIZE);

      expect(randomElements.length).toBe(0);
    });

    test("zero size", () => {
      const SIZE = 0;
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const randomElements = getRandomElements(items, SIZE);

      expect(randomElements.length).toBe(0);
    });

    test("element shows once", () => {
      const SIZE = 0;
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const randomElements = getRandomElements(items, SIZE);

      const uniqueElements = [...new Map(randomElements)];

      expect(uniqueElements.length).toBe(randomElements.length);
    });
  });
});
