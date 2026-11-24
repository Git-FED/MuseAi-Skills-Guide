const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const copies = [
  'site/assets/js/ledger.js',
  'assets/js/ledger.js',
  'android/app/src/main/assets/site/assets/js/ledger.js'
];
const timestamp = '2026-01-01T00:00:00.000Z';

function harness(source) {
  const handlers = new Map();
  const nodes = new Map();
  let stored = '[]';
  let exported;
  let sequence = 0;
  let writes = 0;
  let values = {};
  const elements = Object.fromEntries(
    ['actionId', 'actionType', 'target', 'sentBytes', 'receivedBytes',
      'method', 'evidence', 'status', 'notes'].map(key => [key, {
      get value() { return values[key]; },
      set value(value) { values[key] = value; }
    }])
  );
  function node(key) {
    if (!nodes.has(key)) nodes.set(key, {
      addEventListener(event, fn) { handlers.set(key + ':' + event, fn); },
      querySelectorAll(selector) {
        if (selector !== '[data-edit]') return [];
        return JSON.parse(stored).map(entry => Object.assign(
          node('edit:' + entry.id), { dataset: { edit: entry.id } }
        ));
      },
      classList: { add() {}, remove() {} },
      textContent: ''
    });
    return nodes.get(key);
  }
  Object.assign(node('[data-ledger-form]'), {
    elements, reset() { values = {}; }, querySelector: () => node('submit'),
    scrollIntoView() {}
  });
  const context = {
    document: {
      querySelector: () => ({ querySelector: node }),
      createElement: () => ({ click() {} })
    },
    localStorage: {
      getItem: () => stored,
      setItem(key, value) { stored = value; writes++; }
    },
    FormData: class { get(key) { return values[key] ?? null; } },
    crypto: { randomUUID: () => 'entry-' + (++sequence) },
    Date: class extends Date { constructor() { super(timestamp); } },
    window: { setTimeout() {} },
    Blob: class { constructor(parts) { exported = parts.join(''); } },
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} }
  };
  vm.runInNewContext(source, context, { timeout: 1000 });
  return {
    submit(fields) {
      values = { actionId: 'A-001', target: 'synthetic', ...fields };
      handlers.get('[data-ledger-form]:submit')({ preventDefault() {} });
    },
    edit(id) { handlers.get('edit:' + id + ':click')(); },
    entries: () => JSON.parse(stored),
    writes: () => writes,
    notice: () => node('[data-ledger-notice]').textContent,
    export() {
      handlers.get('[data-ledger-export-json]:click')();
      return JSON.parse(exported);
    }
  };
}

for (const file of copies) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const estimated = { method: 'estimated', sentBytes: '10', receivedBytes: '20' };
  const valid = { ...estimated, evidence: '10 + 20 from synthetic fixture' };
  const unknown = { method: 'unavailable', sentBytes: '', receivedBytes: '' };
  function reject(name, fields) {
    test(file + ': ' + name, () => {
      const h = harness(source);
      h.submit(fields);
      assert.equal(h.writes(), 0);
      assert.deepEqual(h.entries(), []);
      assert.notEqual(h.notice(), 'Saved locally on this device.');
      assert.deepEqual(h.export().entries, []);
    });
  }
  reject('estimate without evidence', estimated);
  reject('whitespace-only evidence', { ...estimated, evidence: '   ' });
  reject('unavailable with both numeric fields', { ...unknown, sentBytes: '10', receivedBytes: '20' });
  reject('unavailable with one numeric field', { ...unknown, receivedBytes: '20' });
  reject('unavailable with explicit zero', { ...unknown, sentBytes: '0' });
  test(file + ': unavailable with blank fields', () => {
    const h = harness(source); h.submit(unknown);
    const [e] = h.entries();
    assert.deepEqual([e.sentBytes, e.receivedBytes, e.totalBytes], [null, null, null]);
    assert.equal(e.method, 'unavailable');
  });
  test(file + ': justified estimate', () => {
    const h = harness(source); h.submit(valid);
    const [e] = h.entries();
    assert.equal(e.totalBytes, 30);
    assert.equal(e.evidence, valid.evidence);
    assert.equal(e.method, 'estimated');
  });
  test(file + ': measured zero', () => {
    const h = harness(source);
    h.submit({ method: 'measured', sentBytes: '0', receivedBytes: '0', evidence: 'counter' });
    const [e] = h.entries();
    assert.deepEqual([e.sentBytes, e.receivedBytes, e.totalBytes], [0, 0, 0]);
  });
  test(file + ': partial measurement preserves null total', () => {
    const h = harness(source);
    h.submit({ method: 'measured', sentBytes: '0', receivedBytes: '', evidence: 'counter' });
    const [e] = h.entries();
    assert.deepEqual([e.sentBytes, e.receivedBytes, e.totalBytes], [0, null, null]);
  });
  test(file + ': invalid edit preserves original', () => {
    const h = harness(source); h.submit(valid);
    const before = h.entries();
    h.edit(before[0].id); h.submit(estimated);
    assert.equal(h.writes(), 1);
    assert.deepEqual(h.entries(), before);
    h.edit(before[0].id); h.submit({ ...unknown, sentBytes: '0' });
    assert.equal(h.writes(), 1);
    assert.deepEqual(h.entries(), before);
    h.edit(before[0].id); h.submit({ ...valid, sentBytes: '15' });
    assert.equal(h.writes(), 2);
    assert.equal(h.entries()[0].id, before[0].id);
    assert.equal(h.entries()[0].totalBytes, 35);
  });
  test(file + ': JSON export preserves valid records', () => {
    const h = harness(source); h.submit(valid); h.submit(unknown);
    h.submit({ method: 'reported', sentBytes: '0', receivedBytes: '12', evidence: 'dashboard' });
    assert.equal(h.entries().length, 3);
    assert.deepEqual(h.export(), { exportedAt: timestamp, entries: h.entries() });
  });
}
