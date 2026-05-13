const MARD_221_HEX = {
  A1:'#FAF4C8', A2:'#FFFFD5', A3:'#FEFF8B', A4:'#FBED56', A5:'#F4D738', A6:'#FEAC4C', A7:'#FE8B4C', A8:'#FFDA45', A9:'#FF995B', A10:'#F77C31', A11:'#FFDD99', A12:'#FE9F72', A13:'#FFC365', A14:'#FD543D', A15:'#FFF365', A16:'#FFFF9F', A17:'#FFE36E', A18:'#FEBE7D', A19:'#FD7C72', A20:'#FFD568', A21:'#FFE395', A22:'#F4F57D', A23:'#E6C9B7', A24:'#F7F8A2', A25:'#FFD67D', A26:'#FFC830',
  B1:'#E6EE31', B2:'#63F347', B3:'#9EF780', B4:'#5DE035', B5:'#35E352', B6:'#65E2A6', B7:'#3DAF80', B8:'#1C9C4F', B9:'#27523A', B10:'#95D3C2', B11:'#5D722A', B12:'#166F41', B13:'#CAEB7B', B14:'#ADE946', B15:'#2E5132', B16:'#C5ED9C', B17:'#9BB13A', B18:'#E6EE49', B19:'#24B88C', B20:'#C2F0CC', B21:'#156A6B', B22:'#0B3C43', B23:'#303A21', B24:'#EEFCA5', B25:'#4E846D', B26:'#8D7A35', B27:'#CCE1AF', B28:'#9EE5B9', B29:'#C5E254', B30:'#E2FCB1', B31:'#B0E792', B32:'#9CAB5A',
  C1:'#E8FFE7', C2:'#A9F9FC', C3:'#A0E2FB', C4:'#41CCFF', C5:'#01ACEB', C6:'#50AAF0', C7:'#3677D2', C8:'#0F54C0', C9:'#324BCA', C10:'#3EBCE2', C11:'#28DDDE', C12:'#1C334D', C13:'#CDE8FF', C14:'#D5FDFF', C15:'#22C4C6', C16:'#1557A8', C17:'#04D1F6', C18:'#1D3344', C19:'#1887A2', C20:'#176DAF', C21:'#BEDDFF', C22:'#67B4BE', C23:'#C8E2FF', C24:'#7CC4FF', C25:'#A9E5E5', C26:'#3CAED8', C27:'#D3DFFA', C28:'#BBCFED', C29:'#34488E',
  D1:'#AEB4F2', D2:'#858EDD', D3:'#2F54AF', D4:'#182A84', D5:'#B843C5', D6:'#AC7BDE', D7:'#8854B3', D8:'#E2D3FF', D9:'#D5B9F8', D10:'#361851', D11:'#B9BAE1', D12:'#DE9AD4', D13:'#B90095', D14:'#8B279B', D15:'#2F1F90', D16:'#E3E1EE', D17:'#C4D4F6', D18:'#A45EC7', D19:'#D8C3D7', D20:'#9C32B2', D21:'#9A009B', D22:'#333A95', D23:'#EBDAFC', D24:'#7786E5', D25:'#494FC7', D26:'#DFC2F8',
  E1:'#FDD3CC', E2:'#FEC0DF', E3:'#FFB7E7', E4:'#E8649E', E5:'#F551A2', E6:'#F13D74', E7:'#C63478', E8:'#FFDBE9', E9:'#E970CC', E10:'#D33793', E11:'#FCDDD2', E12:'#F78FC3', E13:'#B5006D', E14:'#FFD1BA', E15:'#F8C7C9', E16:'#FFF3EB', E17:'#FFE2EA', E18:'#FFC7DB', E19:'#FEBAD5', E20:'#D8C7D1', E21:'#BD9DA1', E22:'#B785A1', E23:'#937A8D', E24:'#E1BCE8',
  F1:'#FD957B', F2:'#FC3D46', F3:'#F74941', F4:'#FC283C', F5:'#E7002F', F6:'#943630', F7:'#971937', F8:'#BC0028', F9:'#E2677A', F10:'#8A4526', F11:'#5A2121', F12:'#FD4E6A', F13:'#F35744', F14:'#FFA9AD', F15:'#D30022', F16:'#FEC2A6', F17:'#E69C79', F18:'#D37C46', F19:'#C1444A', F20:'#CD9391', F21:'#F7B4C6', F22:'#FDC0D0', F23:'#F67E66', F24:'#E698AA', F25:'#E54B4F',
  G1:'#FFE2CE', G2:'#FFC4AA', G3:'#F4C3A5', G4:'#E1B383', G5:'#EDB045', G6:'#E99C17', G7:'#9D5B3E', G8:'#753832', G9:'#E6B483', G10:'#D98C39', G11:'#E0C593', G12:'#FFC890', G13:'#B7714A', G14:'#8D614C', G15:'#FCF9E0', G16:'#F2D9BA', G17:'#78524B', G18:'#FFE4CC', G19:'#E07935', G20:'#A94023', G21:'#B88558',
  H1:'#FDFBFF', H2:'#FEFFFF', H3:'#B6B1BA', H4:'#89858C', H5:'#48464E', H6:'#2F2B2F', H7:'#000000', H8:'#E7D6DB', H9:'#EDEDED', H10:'#EEE9EA', H11:'#CECDD5', H12:'#FFF5ED', H13:'#F5ECD2', H14:'#CFD7D3', H15:'#98A6A8', H16:'#1D1414', H17:'#F1EDED', H18:'#FFFDF0', H19:'#F6EFE2', H20:'#949FA3', H21:'#FFFBE1', H22:'#CACAD4', H23:'#9A9D94',
  M1:'#BCC6B8', M2:'#8AA386', M3:'#697D80', M4:'#E3D2BC', M5:'#D0CCAA', M6:'#B0A782', M7:'#B4A497', M8:'#B38281', M9:'#A58767', M10:'#C5B2BC', M11:'#9F7594', M12:'#644749', M13:'#D19066', M14:'#C77362', M15:'#757D78'
};

const els = {
  input: document.getElementById('imageInput'),
  drop: document.getElementById('dropZone'),
  sourcePreview: document.getElementById('sourcePreview'),
  previewPlaceholder: document.getElementById('previewPlaceholder'),
  scaleMode: document.getElementById('scaleMode'),
  orientation: document.getElementById('orientation'),
  dpi: document.getElementById('dpi'),
  cleanSource: document.getElementById('cleanSource'),
  generate: document.getElementById('generateBtn'),
  download: document.getElementById('downloadBtn'),
  status: document.getElementById('status'),
  canvas: document.getElementById('resultCanvas'),
  originalMeta: document.getElementById('originalMeta'),
  scaleMeta: document.getElementById('scaleMeta'),
  patternMeta: document.getElementById('patternMeta'),
  colorMeta: document.getElementById('colorMeta')
};

const ctx = els.canvas.getContext('2d');
let loadedImage = null;
let loadedFileName = 'pattern';
let lastResult = null;
let currentObjectUrl = null;

const palette = Object.entries(MARD_221_HEX).map(([code, hex]) => {
  const rgb = hexToRgb(hex);
  return { code, hex, rgb, lab: rgbToLab(rgb) };
});
const rgbToCode = new Map(palette.map(p => [p.rgb.join(','), p.code]));
const nearestCache = new Map();

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function srgbToLinear(v) {
  v /= 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function rgbToLab([r8, g8, b8]) {
  const r = srgbToLinear(r8), g = srgbToLinear(g8), b = srgbToLinear(b8);
  let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
  x /= 0.95047; z /= 1.08883;
  const f = t => t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 116);
  const fx = f(x), fy = f(y), fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function labDistance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function nearestMard(r, g, b) {
  const key = `${r},${g},${b}`;
  if (nearestCache.has(key)) return nearestCache.get(key);
  const lab = rgbToLab([r, g, b]);
  let best = palette[0];
  let bestDistance = Infinity;
  for (const color of palette) {
    const distance = labDistance(lab, color.lab);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = color;
    }
  }
  nearestCache.set(key, best);
  return best;
}

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function divisors(n) {
  const result = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result.push(i);
      if (i * i !== n) result.push(n / i);
    }
  }
  return [...new Set(result)].sort((a, b) => a - b);
}

function naturalCodeKey(code) {
  const match = code.match(/^([A-Z]+)(\d+)$/);
  return match ? [match[1], Number(match[2])] : [code, 0];
}

function sortCodes(a, b) {
  const ak = naturalCodeKey(a), bk = naturalCodeKey(b);
  if (ak[0] !== bk[0]) return ak[0].localeCompare(bk[0]);
  return ak[1] - bk[1];
}

function imageToCanvas(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const c = canvas.getContext('2d', { willReadFrequently: true });
  c.imageSmoothingEnabled = false;
  c.drawImage(image, 0, 0);
  return canvas;
}

function cleanPixelArt(canvas, enabled, alphaThreshold = 16) {
  const w = canvas.width, h = canvas.height;
  const srcCtx = canvas.getContext('2d', { willReadFrequently: true });
  const imageData = srcCtx.getImageData(0, 0, w, h);
  if (!enabled) return imageData;

  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < alphaThreshold) {
      data[i] = 0; data[i + 1] = 0; data[i + 2] = 0; data[i + 3] = 0;
      continue;
    }
    const match = nearestMard(data[i], data[i + 1], data[i + 2]);
    data[i] = match.rgb[0]; data[i + 1] = match.rgb[1]; data[i + 2] = match.rgb[2]; data[i + 3] = 255;
  }
  return imageData;
}

function pixelKey(data, index, alphaThreshold = 16) {
  if (data[index + 3] < alphaThreshold) return 'empty';
  return `${data[index]},${data[index + 1]},${data[index + 2]}`;
}

function gcdOfRuns(imageData, alphaThreshold = 16) {
  const { width: w, height: h, data } = imageData;
  const runs = [];
  const maxDim = Math.max(w, h);

  const collect = indexes => {
    let last = null;
    let run = 0;
    for (const index of indexes) {
      const key = pixelKey(data, index, alphaThreshold);
      if (run === 0) {
        last = key;
        run = 1;
      } else if (key === last) {
        run += 1;
      } else {
        if (run > 1 && run < maxDim) runs.push(run);
        last = key;
        run = 1;
      }
    }
    if (run > 1 && run < maxDim) runs.push(run);
  };

  for (let y = 0; y < h; y++) {
    const indexes = [];
    for (let x = 0; x < w; x++) indexes.push((y * w + x) * 4);
    collect(indexes);
  }
  for (let x = 0; x < w; x++) {
    const indexes = [];
    for (let y = 0; y < h; y++) indexes.push((y * w + x) * 4);
    collect(indexes);
  }

  return runs.reduce((acc, v) => gcd(acc, v), 0) || 1;
}

function getVisibleBBox(imageData, alphaThreshold = 16) {
  const { width: w, height: h, data } = imageData;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (data[i + 3] < alphaThreshold) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + 1);
      maxY = Math.max(maxY, y + 1);
    }
  }
  if (maxX < 0) return null;
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

function blockVarianceScore(imageData, scale, offsetX = 0, offsetY = 0, alphaThreshold = 16) {
  const { width: w, height: h, data } = imageData;
  let total = 0;
  let count = 0;
  let visibleBlocks = 0;
  for (let by = offsetY; by + scale <= h; by += scale) {
    for (let bx = offsetX; bx + scale <= w; bx += scale) {
      const values = [];
      for (let y = by; y < by + scale; y++) {
        for (let x = bx; x < bx + scale; x++) {
          const i = (y * w + x) * 4;
          if (data[i + 3] >= alphaThreshold) values.push([data[i], data[i + 1], data[i + 2]]);
        }
      }
      if (values.length > 0) visibleBlocks += 1;
      if (values.length <= 1) { count += 1; continue; }
      const mean = [0, 0, 0];
      for (const v of values) { mean[0] += v[0]; mean[1] += v[1]; mean[2] += v[2]; }
      mean[0] /= values.length; mean[1] /= values.length; mean[2] /= values.length;
      let variance = 0;
      for (const v of values) variance += (v[0] - mean[0]) ** 2 + (v[1] - mean[1]) ** 2 + (v[2] - mean[2]) ** 2;
      total += Math.sqrt(variance / values.length);
      count += 1;
    }
  }
  if (visibleBlocks < 2) return Number.POSITIVE_INFINITY;
  return total / Math.max(1, count);
}

function bestOffsetForScale(imageData, scale, alphaThreshold = 16) {
  let best = { scale, offsetX: 0, offsetY: 0, score: blockVarianceScore(imageData, scale, 0, 0, alphaThreshold) };
  for (let oy = 0; oy < scale; oy++) {
    for (let ox = 0; ox < scale; ox++) {
      const score = blockVarianceScore(imageData, scale, ox, oy, alphaThreshold);
      if (score < best.score) best = { scale, offsetX: ox, offsetY: oy, score };
    }
  }
  return best;
}

function detectSourceGrid(imageData, alphaThreshold = 16) {
  const { width: w, height: h } = imageData;
  const bbox = getVisibleBBox(imageData, alphaThreshold);
  const candidateSet = new Set(divisors(gcd(w, h)).filter(d => d > 1));
  if (bbox) divisors(gcd(bbox.width, bbox.height)).filter(d => d > 1).forEach(d => candidateSet.add(d));
  const runScale = gcdOfRuns(imageData, alphaThreshold);
  if (runScale > 1) candidateSet.add(runScale);

  const candidates = [...candidateSet].filter(d => d > 1 && d <= Math.min(64, w, h)).sort((a, b) => a - b);
  if (!candidates.length) return { scale: 1, offsetX: 0, offsetY: 0, score: 0 };

  const scored = candidates.map(d => bestOffsetForScale(imageData, d, alphaThreshold));
  scored.sort((a, b) => a.score - b.score || a.scale - b.scale);
  const best = scored[0];
  return best.score <= 6 ? best : { scale: 1, offsetX: 0, offsetY: 0, score: best.score };
}

function bestGridShift(offset, scale, min, max, limit) {
  if (!offset) return 0;
  const candidates = [-offset, scale - offset]
    .filter(shift => min + shift >= 0 && max + shift <= limit)
    .sort((a, b) => Math.abs(a) - Math.abs(b));
  if (candidates.length) return candidates[0];
  return Math.abs(-offset) <= Math.abs(scale - offset) ? -offset : scale - offset;
}

function alignImageDataToGrid(imageData, grid, alphaThreshold = 16) {
  if (grid.scale <= 1 || (!grid.offsetX && !grid.offsetY)) return imageData;
  const bbox = getVisibleBBox(imageData, alphaThreshold);
  if (!bbox) return imageData;
  const shiftX = bestGridShift(grid.offsetX, grid.scale, bbox.minX, bbox.maxX, imageData.width);
  const shiftY = bestGridShift(grid.offsetY, grid.scale, bbox.minY, bbox.maxY, imageData.height);
  if (!shiftX && !shiftY) return imageData;

  const aligned = new ImageData(imageData.width, imageData.height);
  const src = imageData.data;
  const dst = aligned.data;
  const { width: w, height: h } = imageData;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x + shiftX;
      const ny = y + shiftY;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const si = (y * w + x) * 4;
      const di = (ny * w + nx) * 4;
      dst[di] = src[si];
      dst[di + 1] = src[si + 1];
      dst[di + 2] = src[si + 2];
      dst[di + 3] = src[si + 3];
    }
  }
  return aligned;
}

function reduceToCells(imageData, scale, alphaThreshold = 16) {
  const { width: w, height: h, data } = imageData;
  if (w % scale || h % scale) throw new Error(`이미지 크기 ${w}x${h}는 ${scale}px 도트로 나눌 수 없습니다.`);
  const rows = [];
  for (let by = 0; by < h; by += scale) {
    const row = [];
    for (let bx = 0; bx < w; bx += scale) {
      const counts = new Map();
      let transparent = 0;
      let visible = 0;
      for (let y = by; y < by + scale; y++) {
        for (let x = bx; x < bx + scale; x++) {
          const i = (y * w + x) * 4;
          if (data[i + 3] < alphaThreshold) {
            transparent += 1;
          } else {
            visible += 1;
            const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
            counts.set(key, (counts.get(key) || 0) + 1);
          }
        }
      }
      if (!visible || transparent > visible) {
        row.push(null);
        continue;
      }
      let bestKey = null, bestCount = -1;
      for (const [key, count] of counts) {
        if (count > bestCount) { bestKey = key; bestCount = count; }
      }
      const rgb = bestKey.split(',').map(Number);
      let code = rgbToCode.get(bestKey);
      if (!code) code = nearestMard(rgb[0], rgb[1], rgb[2]).code;
      const color = palette.find(p => p.code === code);
      row.push({ code, rgb: color.rgb, hex: color.hex });
    }
    rows.push(row);
  }
  return rows;
}

function countCells(cells) {
  const counts = new Map();
  for (const row of cells) for (const cell of row) if (cell) counts.set(cell.code, (counts.get(cell.code) || 0) + 1);
  return counts;
}

function chooseA4(cols, rows, orientation, dpi) {
  const portrait = { width: Math.round(8.2677165354 * dpi), height: Math.round(11.6929133858 * dpi), name: 'portrait' };
  const landscape = { width: portrait.height, height: portrait.width, name: 'landscape' };
  if (orientation === 'portrait') return portrait;
  // Default and auto both prefer A4 landscape for a wide 70/30 print layout.
  return landscape;
}

function textColor([r, g, b]) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 150 ? '#141414' : '#ffffff';
}

function drawCenteredText(ctx, text, x, y, w, h) {
  const m = ctx.measureText(text);
  ctx.fillText(text, x + (w - m.width) / 2, y + h / 2 + Math.abs(m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2 - 1);
}

function cellLabelFontSize(ctx, text, cell) {
  let size = Math.max(5, Math.floor(cell * 0.34));
  while (size > 5) {
    ctx.font = `800 ${size}px system-ui, -apple-system, sans-serif`;
    const metrics = ctx.measureText(text);
    const textHeight = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);
    if (metrics.width <= cell * 0.78 && textHeight <= cell * 0.62) return size;
    size -= 1;
  }
  return size;
}

function fitText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let out = text;
  while (out.length > 2 && ctx.measureText(out + '…').width > maxWidth) out = out.slice(0, -1);
  return out + '…';
}

function renderA4(cells, meta) {
  const rows = cells.length;
  const cols = rows ? cells[0].length : 0;
  const counts = countCells(cells);
  const dpi = Number(els.dpi.value);
  const page = chooseA4(cols, rows, els.orientation.value, dpi);

  els.canvas.width = page.width;
  els.canvas.height = page.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, page.width, page.height);

  const mm = dpi / 25.4;
  // Print-safe A4 margins: keep all content away from printer clipping areas.
  const margin = Math.round(12 * mm);
  const topH = Math.round(18 * mm);
  const bottomH = Math.round(12 * mm);
  const contentX = margin;
  const contentY = margin + topH;
  const contentW = page.width - margin * 2;
  const contentH = page.height - margin - topH - bottomH;
  const leftW = Math.round(contentW * 0.70);
  const rightW = contentW - leftW;
  const dividerX = contentX + leftW;
  const sidebarPad = Math.round(6 * mm);
  const labelPad = Math.round(8 * mm);
  const axisPad = Math.round(8 * mm);
  const availableGridW = leftW - labelPad - sidebarPad;
  const availableGridH = contentH - axisPad;
  const cell = Math.max(7, Math.floor(Math.min(availableGridW / cols, availableGridH / rows)));
  const gridW = cols * cell;
  const gridH = rows * cell;
  const gx = contentX + labelPad + Math.max(0, Math.floor((availableGridW - gridW) / 2));
  const gy = contentY + Math.max(0, Math.floor((availableGridH - gridH) / 2));
  const rx = dividerX + sidebarPad;
  const sidebarContentW = rightW - sidebarPad;

  ctx.fillStyle = '#191f28';
  ctx.font = `700 ${Math.max(16, Math.round(5 * mm))}px system-ui, -apple-system, sans-serif`;
  const title = `${meta.name} — MARD fuse-bead pattern (${cols} x ${rows})`;
  ctx.fillText(fitText(ctx, title, page.width - margin * 2), margin, Math.round(margin * 0.65));
  ctx.fillStyle = '#4e5968';
  ctx.font = `400 ${Math.max(10, Math.round(3.1 * mm))}px system-ui, -apple-system, sans-serif`;
  const subtitle = `A4 ${page.name} / original ${meta.originalWidth}x${meta.originalHeight} -> ${cols}x${rows} / source scale ${meta.scale}x / cleaned + MARD 221 A-M`;
  ctx.fillText(fitText(ctx, subtitle, page.width - margin * 2), margin, Math.round(margin * 0.65 + 6 * mm));

  ctx.strokeStyle = '#e5e8eb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(dividerX, contentY - Math.round(4 * mm));
  ctx.lineTo(dividerX, page.height - margin);
  ctx.stroke();

  const gridLine = '#d4d0ca';
  const emptyFill = '#ffffff';
  const axisLabelSize = Math.max(7, Math.floor(cell * 0.18));
  ctx.textBaseline = 'alphabetic';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const bead = cells[y][x];
      const x0 = gx + x * cell;
      const y0 = gy + y * cell;
      ctx.fillStyle = bead ? bead.hex : emptyFill;
      ctx.fillRect(x0, y0, cell, cell);
      ctx.strokeStyle = gridLine;
      ctx.lineWidth = 1;
      ctx.strokeRect(x0, y0, cell, cell);
      if (bead && cell >= 10) {
        ctx.fillStyle = textColor(bead.rgb);
        const code = cell >= 12 ? bead.code : bead.code[0];
        const labelSize = cellLabelFontSize(ctx, code, cell);
        ctx.font = `800 ${labelSize}px system-ui, -apple-system, sans-serif`;
        drawCenteredText(ctx, code, x0, y0, cell, cell);
      }
    }
  }

  ctx.fillStyle = '#4e5968';
  ctx.font = `400 ${axisLabelSize}px system-ui, -apple-system, sans-serif`;
  const xStep = cols <= 24 ? 1 : cols <= 64 ? 4 : 10;
  for (let x = 0; x < cols; x++) {
    if (x === 0 || (x + 1) % xStep === 0 || x === cols - 1) {
      const label = String(x + 1);
      ctx.fillText(label, gx + x * cell + cell / 2 - ctx.measureText(label).width / 2, gy + gridH + Math.max(8, axisLabelSize * 0.6) + axisLabelSize);
    }
  }
  const yStep = rows <= 24 ? 1 : rows <= 64 ? 4 : 10;
  for (let y = 0; y < rows; y++) {
    if (y === 0 || (y + 1) % yStep === 0 || y === rows - 1) {
      const label = String(y + 1);
      ctx.fillText(label, gx - Math.round(6 * mm) - ctx.measureText(label).width / 2, gy + y * cell + cell / 2 + axisLabelSize / 2);
    }
  }

  let y = gy;
  ctx.fillStyle = '#191f28';
  ctx.font = `700 ${Math.max(13, Math.round(4 * mm))}px system-ui, -apple-system, sans-serif`;
  ctx.fillText('Expected finished image', rx, y);
  y += Math.round(7 * mm);

  const previewMax = Math.min(sidebarContentW, Math.round(58 * mm), Math.floor(page.height * 0.28));
  const previewCell = Math.max(2, Math.floor(previewMax / Math.max(cols, rows)));
  const pw = cols * previewCell;
  const ph = rows * previewCell;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rx, y, pw, ph);
  for (let yy = 0; yy < rows; yy++) {
    for (let xx = 0; xx < cols; xx++) {
      const bead = cells[yy][xx];
      if (!bead) continue;
      ctx.fillStyle = bead.hex;
      ctx.fillRect(rx + xx * previewCell, y + yy * previewCell, previewCell, previewCell);
    }
  }
  ctx.strokeStyle = '#d4d0ca';
  ctx.strokeRect(rx, y, pw, ph);
  y += ph + Math.round(9 * mm);

  ctx.fillStyle = '#191f28';
  ctx.font = `700 ${Math.max(13, Math.round(4 * mm))}px system-ui, -apple-system, sans-serif`;
  ctx.fillText('Legend / bead counts', rx, y);
  y += Math.round(7 * mm);

  const sortedCounts = [...counts.entries()].sort((a, b) => b[1] - a[1] || sortCodes(a[0], b[0]));
  const legendFontSize = Math.max(9, Math.round(3 * mm));
  const lineH = Math.max(18, Math.round(5.2 * mm));
  const swatch = Math.max(14, Math.round(4.2 * mm));
  const legendBottom = page.height - margin - Math.round(26 * mm);
  let used = 0;
  ctx.font = `400 ${legendFontSize}px system-ui, -apple-system, sans-serif`;
  for (const [code, count] of sortedCounts) {
    if (y + lineH > legendBottom) {
      const remain = sortedCounts.length - used;
      if (remain > 0) ctx.fillText(`... ${remain} more colors`, rx, y);
      break;
    }
    const hex = MARD_221_HEX[code];
    ctx.fillStyle = hex;
    ctx.fillRect(rx, y + 1, swatch, swatch);
    ctx.strokeStyle = '#555';
    ctx.strokeRect(rx, y + 1, swatch, swatch);
    ctx.fillStyle = '#191f28';
    ctx.fillText(fitText(ctx, `${code} (${hex}) — ${count}`, sidebarContentW - swatch - 10), rx + swatch + 10, y + swatch * 0.8);
    y += lineH;
    used += 1;
  }

  const statsBlockH = Math.round(22 * mm);
  const statsY = Math.min(y + Math.round(6 * mm), page.height - margin - statsBlockH);
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  ctx.fillStyle = '#191f28';
  ctx.font = `700 ${Math.max(13, Math.round(4 * mm))}px system-ui, -apple-system, sans-serif`;
  ctx.fillText(`Total beads: ${total}`, rx, statsY);
  ctx.font = `400 ${legendFontSize}px system-ui, -apple-system, sans-serif`;
  ctx.fillText(`Colors used: ${counts.size}`, rx, statsY + Math.round(6.5 * mm));
  ctx.fillText(`Standard: ${(cols * 0.5).toFixed(1)} x ${(rows * 0.5).toFixed(1)} cm`, rx, statsY + Math.round(11.5 * mm));
  ctx.fillText(`Mini: ${(cols * 0.26).toFixed(1)} x ${(rows * 0.26).toFixed(1)} cm`, rx, statsY + Math.round(16.5 * mm));

  lastResult = { cells, meta, counts, dpi, page };
}

async function loadFile(file) {
  if (!file) return;
  loadedFileName = file.name.replace(/\.[^.]+$/, '').replace(/[^A-Za-z0-9가-힣_.-]+/g, '_') || 'pattern';
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  const url = URL.createObjectURL(file);
  currentObjectUrl = url;
  const image = new Image();
  image.onload = () => {
    loadedImage = image;
    els.sourcePreview.src = url;
    els.sourcePreview.hidden = false;
    els.previewPlaceholder.hidden = true;
    els.generate.disabled = false;
    els.download.disabled = true;
    els.originalMeta.textContent = `${image.naturalWidth} x ${image.naturalHeight}`;
    els.scaleMeta.textContent = '-';
    els.patternMeta.textContent = '-';
    els.colorMeta.textContent = '-';
    setStatus('이미지를 불러왔습니다. 도안 만들기를 눌러주세요.');
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    if (currentObjectUrl === url) currentObjectUrl = null;
    setStatus('이미지를 읽지 못했습니다. 다른 파일을 선택해주세요.', true);
  };
  image.src = url;
}

function setStatus(message, isError = false) {
  els.status.textContent = message;
  els.status.style.color = isError ? '#e03131' : '#6b7684';
}

function generate() {
  if (!loadedImage) return;
  try {
    setStatus('이미지를 픽셀아트 스타일로 정리하고 도트를 감지하는 중입니다...');
    els.generate.disabled = true;
    els.download.disabled = true;

    // Let the status text paint before heavy canvas work starts.
    requestAnimationFrame(() => {
      try {
        const source = imageToCanvas(loadedImage);
        const cleaned = cleanPixelArt(source, els.cleanSource.checked);
        const grid = els.scaleMode.value === 'auto'
          ? detectSourceGrid(cleaned)
          : bestOffsetForScale(cleaned, Number(els.scaleMode.value));
        const aligned = alignImageDataToGrid(cleaned, grid);
        const cells = reduceToCells(aligned, grid.scale);
        const rows = cells.length;
        const cols = rows ? cells[0].length : 0;
        const counts = countCells(cells);
        renderA4(cells, {
          name: loadedFileName,
          originalWidth: source.width,
          originalHeight: source.height,
          scale: grid.scale
        });

        els.scaleMeta.textContent = grid.offsetX || grid.offsetY ? `${grid.scale}px (offset ${grid.offsetX},${grid.offsetY} 보정)` : `${grid.scale}px`;
        els.patternMeta.textContent = `${cols} x ${rows}`;
        els.colorMeta.textContent = `${counts.size}색`;
        els.download.disabled = false;
        setStatus(`A4 도안을 만들었습니다. ${cols}x${rows}, ${counts.size}색, 총 ${[...counts.values()].reduce((a, b) => a + b, 0)}개입니다.`);
      } catch (error) {
        console.error(error);
        setStatus(error.message || '도안 생성 중 오류가 발생했습니다.', true);
      } finally {
        els.generate.disabled = !loadedImage;
      }
    });
  } catch (error) {
    console.error(error);
    setStatus(error.message || '도안 생성 중 오류가 발생했습니다.', true);
    els.generate.disabled = !loadedImage;
  }
}

function crc32(bytes) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (const byte of bytes) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function uint32be(value) {
  return [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255];
}

function chunk(type, data) {
  const typeBytes = [...type].map(ch => ch.charCodeAt(0));
  const body = new Uint8Array(4 + typeBytes.length + data.length + 4);
  body.set(uint32be(data.length), 0);
  body.set(typeBytes, 4);
  body.set(data, 8);
  const crc = crc32(body.slice(4, 8 + data.length));
  body.set(uint32be(crc), 8 + data.length);
  return body;
}

async function addPngDpi(blob, dpi) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const ppm = Math.round(dpi / 0.0254);
  const phys = new Uint8Array([...uint32be(ppm), ...uint32be(ppm), 1]);
  const physChunk = chunk('pHYs', phys);
  // Insert after IHDR, which is always the first chunk: 8-byte signature + 25-byte IHDR chunk.
  const insertAt = 33;
  return new Blob([bytes.slice(0, insertAt), physChunk, bytes.slice(insertAt)], { type: 'image/png' });
}

async function downloadPng() {
  if (!lastResult) return;
  els.canvas.toBlob(async blob => {
    const dpiBlob = await addPngDpi(blob, lastResult.dpi);
    const url = URL.createObjectURL(dpiBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${loadedFileName}_${lastResult.cells[0].length}x${lastResult.cells.length}_mard_a4.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

els.input.addEventListener('change', event => loadFile(event.target.files[0]));
els.generate.addEventListener('click', generate);
els.download.addEventListener('click', downloadPng);

for (const eventName of ['dragenter', 'dragover']) {
  els.drop.addEventListener(eventName, event => {
    event.preventDefault();
    els.drop.classList.add('is-dragover');
  });
}
for (const eventName of ['dragleave', 'drop']) {
  els.drop.addEventListener(eventName, event => {
    event.preventDefault();
    els.drop.classList.remove('is-dragover');
  });
}
els.drop.addEventListener('drop', event => loadFile(event.dataTransfer.files[0]));

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, els.canvas.width, els.canvas.height);
