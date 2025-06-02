import * as punycode from "punycode";
const mockPunycode = {
  decode: jest.fn(punycode.decode),
  encode: jest.fn(punycode.encode),
  toASCII: jest.fn(punycode.toASCII),
  toUnicode: jest.fn(punycode.toUnicode),
};
export default mockPunycode;
// Must fix it like this
