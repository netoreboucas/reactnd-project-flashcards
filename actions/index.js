export const TEST = 'TEST'

export function test (test) {
  return {
    type: TEST,
    test
  }
}
