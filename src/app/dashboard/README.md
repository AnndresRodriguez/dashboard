# Dashboard - (Clean Arquitecture)

## Flujo de Datos Recomendado

```
UI Component → Store → Use Case → Port → Adapter → API
     ↑           ↓
     └───────────┘
   Consume Data
```
### 1. **UI Component**
- Inyecta el store
- Llama a métodos del store
- Consume signals reactivos

### 2. **Store**
- Maneja el estado global
- Contiene métodos para cargar datos
- Proporciona computed signals

### 3. **Use Case**
- Contiene lógica de negocio
- Es llamado por el store
- No es consumido directamente por la UI

### 4. **Port & Adapter**
- Abstracción de la infraestructura
- Manejo de datos externos
- Transformación de datos

## Ventajas de Consumir desde el Store

### 1. **Estado Centralizado**
- Un solo lugar para toda la información
- Evita duplicación de datos
- Facilita el debugging

### 2. **Reactividad Automática**
- Los componentes se actualizan automáticamente
- No necesitas manejar manualmente los signals
- Mejor performance con detección de cambios

### 3. **Caching Inteligente**
- Evita llamadas innecesarias a la API
- Los datos persisten entre navegaciones
- Mejor experiencia de usuario

### 4. **Manejo de Estados**
- Loading, error, empty states centralizados
- Consistencia en toda la aplicación
- Reutilización de lógica

### 5. **Testing Simplificado**
- Más fácil de testear
- Mocks centralizados
- Mejor cobertura de código

## Beneficios de esta Arquitectura

1. **Separación de Responsabilidades**: Cada capa tiene su responsabilidad específica
2. **Testabilidad**: Fácil de testear cada componente por separado
3. **Mantenibilidad**: Código más limpio y organizado
4. **Escalabilidad**: Fácil de extender y modificar
5. **Performance**: Mejor rendimiento con signals reactivos
6. **UX**: Mejor experiencia de usuario con estados bien manejados
