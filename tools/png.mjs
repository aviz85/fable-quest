// Minimal PNG encoder (RGB, no compression — stored deflate blocks). Pure Node, no deps.
import { writeFileSync } from 'node:fs';

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function adler32(buf) {
  let a = 1, b = 0;
  for (let i = 0; i < buf.length; i++) { a = (a + buf[i]) % 65521; b = (b + a) % 65521; }
  return ((b << 16) | a) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function deflateStored(raw) {
  const parts = [Buffer.from([0x78, 0x01])];
  for (let off = 0; off < raw.length; off += 65535) {
    const block = raw.subarray(off, Math.min(off + 65535, raw.length));
    const final = off + 65535 >= raw.length ? 1 : 0;
    const hdr = Buffer.alloc(5);
    hdr[0] = final;
    hdr.writeUInt16LE(block.length, 1);
    hdr.writeUInt16LE(~block.length & 0xFFFF, 3);
    parts.push(hdr, block);
  }
  const ad = Buffer.alloc(4); ad.writeUInt32BE(adler32(raw));
  parts.push(ad);
  return Buffer.concat(parts);
}

// fb: Uint8Array of w*h*3 RGB
export function writePNG(path, fb, w, h) {
  const raw = Buffer.alloc(h * (w * 3 + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0; // filter: none
    fb.subarray(y * w * 3, (y + 1) * w * 3).forEach((v, i) => raw[y * (w * 3 + 1) + 1 + i] = v);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateStored(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
}
