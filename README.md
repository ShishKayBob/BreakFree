# BreakFree

BreakFree is a modern Angular 20+ web application for personal finance management, featuring budgeting, debt tracking, and financial projections. It uses PrimeNG v20, PrimeUIX themes, and Chart.js for a rich, interactive UI.

## Features
- Customizable theme with extended semantic colors (primary, secondary, accent) based on the Aura preset
- Modular Angular architecture with atomic design (atom, molecule, organism components)
- Budget builder, debt center, monthly view, and dashboard
- Data visualization with Chart.js
- Persistent data via local storage
- Responsive and accessible UI with PrimeNG components

## Getting Started

### Prerequisites
- Node.js v18+ (recommended)
- npm v9+

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd BreakFree
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the local dev server:
```bash
npm start
```
Visit [http://localhost:4200/](http://localhost:4200/) in your browser. The app reloads on file changes.

### Building for Production
To build the project:
```bash
npm run build
```
The output is in the `dist/` directory, optimized for deployment.

### Running Unit Tests
Run tests with Karma:
```bash
npm test
```

### Theming & Customization
- The theme is defined in `src/app/breakfree-theme.ts` and extends the Aura preset.
- You can customize primary, secondary, and accent colors in the `semantic` section.
- TypeScript overrides are in `src/app/types/overrides/semantics.ts` to support custom theme keys.

### Project Structure
- `src/app/components/atom/` – Smallest UI elements (e.g., buttons, headers)
- `src/app/components/molecule/` – Compound components (e.g., budget list, debt allocation)
- `src/app/components/organism/` – Complex UI sections (e.g., dashboard, landing page)
- `src/app/services/` – Business logic and data services
- `src/app/types/` – TypeScript interfaces and type overrides
- `src/app/utils/` – Utility functions

### Useful Commands
- Generate a new component:
  ```bash
  ng generate component <component-name>
  ```
- List all schematics:
  ```bash
  ng generate --help
  ```

## Additional Resources
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [PrimeNG Documentation](https://primeng.org/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

---

For questions or contributions, please open an issue or pull request.
