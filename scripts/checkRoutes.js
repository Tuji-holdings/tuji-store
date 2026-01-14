const routes = ['/', '/admin', '/cart', '/product/sample-tshirt'];
(async () => {
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3001' + r);
      const text = await res.text();
      console.log('\n---', r, 'Status:', res.status, '---');
      console.log(text.slice(0, 800));
    } catch (e) {
      console.error(r, 'error', e && e.message);
    }
  }
})();