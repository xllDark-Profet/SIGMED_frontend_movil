const fs = require('fs');
const dotenv = require('dotenv');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
const apiKey = process.env.GOOGLE_MAPS_KEY;

if (!apiKey) {
  console.error('GOOGLE_MAPS_KEY no encontrada en el archivo .env');
  process.exit(1);
}

fs.readFile(manifestPath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  let result = data.replace(/<meta-data android:name="com.google.android.geo.API_KEY" android:value=".*"\/>/, 
    `<meta-data android:name="com.google.android.geo.API_KEY" android:value="${apiKey}" />`);

  fs.writeFile(manifestPath, result, 'utf8', (err) => {
     if (err) return console.log(err);
  });
});
