import "@testing-library/dom";
import FindLastSpot from "../functions/LastSpot.js";

describe("FindLastSpot", () => {
  it("Null array", () => {
    expect(
      FindLastSpot([null, null, null, null, null, null, null, null, null])
    ).toBe(8);
  });
  it("Index 8 filled", () => {
    expect(
      FindLastSpot([null, null, null, null, null, null, null, null, "X"])
    ).toBe(7);
  });
  it("Index 7 filled", () => {
    expect(
      FindLastSpot([null, null, null, null, null, null, null, "X", null])
    ).toBe(8);
  });
  it("Indeces 7 & 8 filled", () => {
    expect(
      FindLastSpot([null, null, null, null, null, null, null, "X", "O"])
    ).toBe(6);
  });
  it("Indeces 4, 5, 7, & 8 filled", () => {
    expect(
      FindLastSpot([null, null, null, null, "X", "O", null, "O", "X"])
    ).toBe(6);
  });
});
