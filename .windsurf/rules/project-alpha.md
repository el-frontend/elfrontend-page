---
trigger: always_on
---

# 🚀 Project Alpha – Workspace Rules

## Build & Test
1. El sistema de build es **Bazel** — no generes scripts `npm run build`.  
2. Las pruebas se ejecutan con **pytest**; evita el módulo `unittest`.

## UI Guidelines
- Usa **TailwindCSS** con el preset `@company/tailwind-preset`.
- Todos los componentes deben provenir de **Shadcn UI**.

<api_guidelines>
- Consume solo los endpoints **/v2/** del backend.
- Incluye el JWT de `process.env.TOKEN` en cada petición.
</api_guidelines>

## Límites
- Mantén este archivo por debajo de 6 000 caracteres; excesos se truncarán.