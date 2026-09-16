// Compile a single-screen canvas preview from the local homepage.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const header = source.match(/<header[\s\S]*?<\/header>/)[0];
const hero = source.match(/<section class="sell-hero"[\s\S]*?<\/section>/)[0];
const css = fs.readFileSync(path.join(root, 'jnit-sales.css'), 'utf8');
let markup = header + hero;
markup = markup.replace(/src="([^"]+)"/g, (_, file) => 'src="data:image/png;base64,' + fs.readFileSync(path.join(root,file)).toString('base64') + '"');
let count = 0;
markup = markup.replace(/<a /g, () => '<a id="jnit-preview-link-' + (++count) + '" ');
markup = markup.replace(/href="(?!https:|#)([^"]+)"/g, (_, link) => 'href="https://jnit.co.za/' + link + '"');
const reset = '*{box-sizing:border-box}body{margin:0;font-family:"DM Sans",sans-serif;line-height:1.6}h1,h2,h3,p{margin-top:0}a{color:inherit}.site-header{height:88px;padding:0 5vw;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;gap:11px;align-items:center;text-decoration:none;font-family:Manrope,sans-serif}.brand img{width:43px;height:43px;object-fit:contain}.brand span{display:flex;flex-direction:column}.brand strong{font-size:22px;letter-spacing:.14em;line-height:1}.brand small{font-size:10px;text-transform:uppercase;letter-spacing:.15em;margin-top:6px;color:#485c78}nav{display:flex;gap:24px;align-items:center}nav a{font-size:13px;text-decoration:none;font-weight:700}.nav-cta{padding:14px 20px;background:#081b3d;color:white;border-radius:7px}.menu-button{display:none}.sell-heading h1{max-width:none}';
const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JNIT — Sales-led homepage</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><style>' + reset + css + '</style></head><body><div class="sell-site min-h-screen">' + markup + '</div></body></html>';
fs.mkdirSync(path.join(__dirname,'tmp'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'tmp','homepage.html'),html);
console.log('Compiled one-screen preview with embedded JNIT logo and two demo screenshots.');
