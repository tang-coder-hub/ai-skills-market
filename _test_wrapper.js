
// Simulate browser globals
global.window = global;
global.document = {
    querySelector: () => ({ innerHTML: '', insertAdjacentHTML: () => {}, textContent: '', classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false } }),
    querySelectorAll: () => [],
    createElement: () => ({ textContent: '', className: '', classList: { add: () => {} }, appendChild: () => {}, setAttribute: () => {}, innerHTML: '', insertAdjacentHTML: () => {} }),
    getElementById: () => ({ textContent: '', addEventListener: () => {}, appendChild: () => {}, innerHTML: '', querySelector: () => null }),
    addEventListener: () => {},
    createDocumentFragment: () => ({ appendChild: () => {} }),
    body: { appendChild: () => {} },
};
global.localStorage = { getItem: () => '', setItem: () => {} };
global.fetch = async () => { throw new Error('fetch blocked'); };
global.addEventListener = () => {};
global.DOMContentLoaded = () => {};

console.log('=== Loading i18n.js ===');
try {
    require('./i18n.js');
    console.log('i18n.js OK');
} catch(e) {
    console.error('i18n.js ERROR:', e.message);
    console.error('Stack:', e.stack);
}

console.log('=== Loading app.js ===');
try {
    require('./app.js');
    console.log('app.js OK');
} catch(e) {
    console.error('app.js ERROR:', e.message);
    console.error('Stack:', e.stack);
}
