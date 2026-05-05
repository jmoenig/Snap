/**
 * "Inspired" by Encoder7Bit.h/Encoder7Bit.cpp in the
 * Firmata source code.
 */
export default {
  to7BitArray(data) {
    let shift = 0;
    let previous = 0;
    const output = [];

    for (let byte of data) {
      if (shift === 0) {
        output.push(byte & 0x7f);
        shift++;
        previous = byte >> 7;
      } else {
        output.push(((byte << shift) & 0x7f) | previous);
        if (shift === 6) {
          output.push(byte >> 1);
          shift = 0;
        } else {
          shift++;
          previous = byte >> (8 - shift);
        }
      }
    }

    /* istanbul ignore else */
    if (shift > 0) {
      output.push(previous);
    }

    return output;
  },
  from7BitArray(encoded) {
    const expectedBytes = encoded.length * 7 >> 3;
    const decoded = [];

    for (let i = 0; i < expectedBytes; i++) {
      const j = i << 3;
      const pos = (j / 7) >>> 0;
      const shift = j % 7;
      decoded[i] = (encoded[pos] >> shift) | ((encoded[pos + 1] << (7 - shift)) & 0xFF);
    }

    return decoded;
  }
};
