import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Script para generar automáticamente service/endpoints.ts leyendo los functionConfig de cada subcarpeta de /service

interface Endpoint {
    name: string;
    handler: string;
    path: string;
    method: string;
    cors?: boolean;
    timeout?: number;
}

interface HttpEvent {
    http: {
        path: string;
        method: string;
        cors?: boolean;
    };
}

interface FunctionConfig {
    name?: string;
    handler: string;
    events?: HttpEvent[];
    timeout?: number;
}

const serviceDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "service");
const outputFile = path.join(serviceDir, "index.ts");

function extractEndpoint(config: FunctionConfig, folder: string): Endpoint {
    const httpEvent = config.events?.find((e) => e.http);
    if (!httpEvent?.http?.path || !httpEvent?.http?.method) {
        throw new Error(`El servicio '${folder}' no tiene un evento http válido en functionConfig.`);
    }
    return {
        name: config.name || folder,
        handler: config.handler,
        path: httpEvent.http.path,
        method: httpEvent.http.method,
        cors: httpEvent.http.cors,
        timeout: config.timeout,
    };
}

function getServiceDirectories(baseDir: string): string[] {
    return fs
        .readdirSync(baseDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "node_modules")
        .map((d) => d.name);
}

function parseFunctionConfig(content: string): FunctionConfig | null {
    const match = content.match(/const functionConfig = ({[\s\S]*?});/);
    if (!match) return null;
    // Solo para uso interno, nunca en producción
    const jsConfig = match[1].replace(/"([^\"]+)":/g, "$1:").replace(/"/g, "'");
    // eslint-disable-next-line no-eval
    // biome-ignore lint/security/noGlobalEval: false positive, script solo para uso interno
    // biome-ignore lint/style/useTemplate: necesario para eval
    return eval("(" + jsConfig + ")");
}

function main(): void {
    const dirs = getServiceDirectories(serviceDir);
    const services: Endpoint[] = [];

    for (const dir of dirs) {
        const indexPath = path.join(serviceDir, dir, "index.ts");
        if (!fs.existsSync(indexPath)) continue;
        const content = fs.readFileSync(indexPath, "utf8");
        const config = parseFunctionConfig(content);
        if (config) {
            services.push(extractEndpoint(config, dir));
        }
    }

    const fileContent = `// Archivo generado automáticamente. No editar manualmente\n\nexport interface Endpoint {\n  name: string;\n  handler: string;\n  path: string;\n  method: string;\n  cors?: boolean;\n  timeout?: number;\n}\n\nexport const services: Endpoint[] = ${JSON.stringify(services, null, 2)};\n`;
    fs.writeFileSync(outputFile, fileContent);
    console.log(`Servicios generados: ${services.length}`);
}

main();
