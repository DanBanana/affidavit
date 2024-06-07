import { Routes } from '@angular/router';

export const documentGeneratorRoutes: Routes = [
  {
    path: 'document-generator',
    loadComponent: () =>
      import('./document-generator.component').then(
        (m) => m.DocumentGeneratorComponent
      ),
  },
];
