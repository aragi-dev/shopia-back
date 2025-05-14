
### Proyecto desarollado con la finalidad de enfrentarse a retos y mejorar como desarollador no hay un objetivo claro pero se intenta mejorar el disenio de la infrestuctura para mejorar la escalabilidad y un codigo mas legible y automatizar prosesos

# Shopia Backend - E-commerce API (Serverless)

Backend serverless para la gestión de un e-commerce, desarrollado con Node.js, TypeScript y Serverless Framework v4. Provee endpoints para la administración de categorías, productos, ventas y más, desplegado en AWS Lambda y PostgreSQL.

---

[![Build Status](https://img.shields.io/github/actions/workflow/status/tu-org/tu-repo/ci.yml?branch=main)](https://github.com/tu-org/tu-repo/actions)
[![Serverless v4](https://img.shields.io/badge/serverless-v4-blue)](https://www.serverless.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Tabla de Contenidos
- [Instalación](#instalación)
- [Prerrequisitos](#prerrequisitos)
- [Configuración Serverless](#configuración-serverless)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Arquitectura](#arquitectura)
- [Importante](#importante)
- [Licencia](#licencia)

---

## Prerrequisitos
- Node.js >= 20.x
- Serverless Framework v4 (`bun install -g serverless`)
- Cuenta AWS y credenciales configuradas (`aws configure`)
- PostgreSQL (local o en la nube)
- bun (recomendado) o npm o pnpm

## Instalación
```bash
git clone https://github.com/aragi-dev/shopia-back
cd shopia-back
bun install
```

## Configuración Serverless
- `frameworkVersion: '4'` en `serverless.ts`.
- Uso de `stages` para ambientes (`dev`,`qa`prod`).
- Plugins recomendados: `serverless-offline`, `serverless-iam-roles-per-function`.

## Uso
```bash
# Desarrollo local
bun dev
```

## Despliegue y Dev Mode
- `bun dev`: desarrollo local con logs en vivo.
- `serverless dev`: despliegue a AWS Lambda.

## Arquitectura

La estructura del proyecto está organizada para separar claramente la lógica de negocio, la infraestructura y los recursos de AWS. A continuación, un resumen visual y explicativo:

```
shopia-back/
├── service/         # Entrypoints y configuración de endpoints Serverless
├── src/
│   ├── entitys/     # Modelos de datos (entidades de negocio)
│   ├── interfaces/  # Interfaces y validaciones de datos
│   ├── repository/  # Acceso a datos y lógica de persistencia
│   ├── usecase/     # Casos de uso (lógica de negocio principal)
│   └── utilities/   # Utilidades, helpers, logger, y configuración DB
```

- **service/**: Define los endpoints y la configuración de inyección de dependencias para cada función Lambda.
- **src/entitys/**: Contiene las entidades que representan las tablas y objetos principales del e-commerce (categoría, producto, venta, etc.).
- **src/repository/**: Implementa la lógica de acceso a la base de datos para cada entidad.
- **src/usecase/**: Aloja la lógica de negocio, como la creación de categorías o productos.
- **src/utilities/**: Incluye utilidades generales, formateadores de respuesta, manejo de errores, logger y la configuración de la base de datos.

Esta estructura facilita la escalabilidad, el mantenimiento y la separación de responsabilidades en el backend serverless.

## Contribuir
1. Haz fork del repo
2. Crea una rama (`feature/nueva-funcionalidad`)
3. Haz un PR
4. Sigue los estándares de conmicional-comits
5. Reporta issues en GitHub

## Importante

### Notas sobre advertencias y fixes temporales

Actualmente el proyecto presenta dos advertencias/fixes temporales:

1. **Fix temporal para ErrorOptions en inversifyjs**
   - Archivo: `types/inversify-fix.d.ts`
   - Motivo: Soluciona un error de tipos relacionado con `ErrorOptions` en la librería `inversifyjs/container` la cual es un error interino de inversify.
   - **Este archivo debe eliminarse cuando el bug sea corregido oficialmente en la dependencia.**

2. **Supresión de advertencias de Node.js**
   - Al ejecutar el proyecto, Node.js puede mostrar advertencias como:
     ```
     (node:43295) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
     (Use `node --trace-deprecation ...` to show where the warning was created)
     ```
   - **Nota:** Esta supresión solo oculta los mensajes en consola. Ya intentamos actualizar y revisar todas las dependencias, pero el warning proviene de una dependencia de bajo nivel que aún no lo ha corregido. Es recomendable revisar y corregir las advertencias en desarrollo cuando sea posible, ya que pueden indicar problemas de seguridad o compatibilidad futura. El uso de `NODE_NO_WARNINGS=1` es solo una solución temporal para mantener la consola limpia en ambientes de desarrollo o producción.

## Licencia
MIT
