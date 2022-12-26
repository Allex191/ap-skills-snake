import { checkIsAppleConsumed } from "utils/utils"

describe('utils', () => {
  it('should return boolean if headPos is the same as applePos ', () => {
    expect(checkIsAppleConsumed(2, 3)).toBe(5)
  })
})