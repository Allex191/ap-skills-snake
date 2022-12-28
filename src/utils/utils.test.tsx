import { CanvasItemShape, checkIsAppleConsumed } from "utils/utils";

describe("checkIsAppleConsumed", () => {
  const mockHeadPos1: CanvasItemShape[] = [{ x: 300, y: 300 }];
  const mockApplePos1: CanvasItemShape[] = [{ x: 300, y: 300 }];
  const mockApplePos2: CanvasItemShape[] = [{ x: 400, y: 400 }];

  it("should return true if headPos is the same as applePos ", () => {
    expect(checkIsAppleConsumed(mockHeadPos1, mockApplePos1)).toBe(true);
  });

  it("should return false if headPos is NOT the same as applePos ", () => {
    expect(checkIsAppleConsumed(mockHeadPos1, mockApplePos2)).toBe(false);
  });
});
