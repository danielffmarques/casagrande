import fs from 'fs';

const showcaseDir = 'projects/casagrande/04_prototype/assets/img/showcase';
const files = fs.readdirSync(showcaseDir).filter(f => f.endsWith('.jpg'));

let cards = files.map(f => `<div class="card"><h3>${f}</h3><img src="assets/img/showcase/${f}"></div>`).join('\n');

const html = `<!DOCTYPE html>
<html>
<head><style>body{background:#222;color:#fff;font-family:sans-serif;display:flex;flex-wrap:wrap;gap:15px;padding:20px;}
.card{background:#333;padding:10px;border-radius:8px;width:280px;}
img{width:100%;height:180px;object-fit:cover;border-radius:4px;}
h3{font-size:14px;margin:0 0 6px 0;word-break:break-all;}
</style></head>
<body>${cards}</body></html>`;

fs.writeFileSync('projects/casagrande/04_prototype/showcase_preview.html', html);
console.log('showcase_preview.html written');
