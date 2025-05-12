import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Script para generar automáticamente service/endpoints.ts leyendo los functionConfig de cada subcarpeta de /service

const serviceDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'service');
const outputFile = path.join(serviceDir, 'endpoints.ts');

function extractEndpoint(config, folder) {
  // Busca el primer evento http
  const httpEvent = config.events?.find(e => e.http);
  return {
    name: config.name || folder,
    handler: config.handler,
    path: httpEvent?.http?.path,
    method: httpEvent?.http?.method,
    cors: httpEvent?.http?.cors,
    timeout: config.timeout,
  };
}

function main() {
  const dirs = fs.readdirSync(serviceDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'node_modules')
    .map(d => d.name);

  const services = [];
  for (const dir of dirs) {
    const indexPath = path.join(serviceDir, dir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      const match = content.match(/const functionConfig = ({[\s\S]*?});/);
      if (match) {
        // Evalúa el objeto functionConfig (solo para uso interno, no en producción)
        const jsConfig = match[1].replace(/"([^\"]+)":/g, '$1:').replace(/"/g, '\'');
        // eslint-disable-next-line no-eval
        const config = eval('(' + jsConfig + ')');
        services.push(extractEndpoint(config, dir));
      }
    }
  }

  const fileContent = `// Archivo generado automáticamente. No editar manualmente\n\nexport interface Endpoint {\n  name: string;\n  handler: string;\n  path: string;\n  method: string;\n  cors?: boolean;\n  timeout?: number;\n}\n\nexport const services: Endpoint[] = ${JSON.stringify(services, null, 2)};\n`;
  fs.writeFileSync(outputFile, fileContent);
  console.log('Servicios', services.length);
}

main();
