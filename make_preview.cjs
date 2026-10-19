const fs = require('fs');
const html = `<!DOCTYPE html>
<html>
<head><style>body{background:#222;color:#fff;font-family:sans-serif;display:flex;flex-wrap:wrap;gap:20px;padding:20px;}
.card{background:#333;padding:10px;border-radius:8px;width:340px;}
img{width:100%;height:220px;object-fit:cover;border-radius:4px;}
</style></head>
<body>
  <div class="card"><h3>casagrande_neve_0.jpg</h3><img src="assets/img/casagrande_neve_0.jpg"></div>
  <div class="card"><h3>casagrande_neve_17.jpg</h3><img src="assets/img/casagrande_neve_17.jpg"></div>
  <div class="card"><h3>torre_neve.jpg</h3><img src="assets/img/torre_neve.jpg"></div>
  <div class="card"><h3>casagrande_19.jpg</h3><img src="assets/img/casagrande_19.jpg"></div>
  <div class="card"><h3>casagrande_43.jpg</h3><img src="assets/img/casagrande_43.jpg"></div>
  <div class="card"><h3>actividades_10.jpg</h3><img src="assets/img/showcase/actividades_10.jpg"></div>
  <div class="card"><h3>actividades_11.jpg</h3><img src="assets/img/showcase/actividades_11.jpg"></div>
  <div class="card"><h3>actividades_12.jpg</h3><img src="assets/img/showcase/actividades_12.jpg"></div>
</body>
</html>`;
fs.writeFileSync('projects/casagrande/04_prototype/img_preview.html', html);
console.log('img_preview.html created successfully');
