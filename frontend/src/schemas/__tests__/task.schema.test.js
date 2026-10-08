import { describe, it, expect } from 'vitest';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../task.schema';

// Pruebas unitarias para validar las reglas del esquema Zod de tareas
describe('Pruebas unitarias: createTaskSchema (Zod)', () => {
  // Test 1: Comportamiento esperado cuando los datos cumplen todas las reglas
  it('debe validar correctamente cuando los datos son validos', () => {
    const validData = {
      title: 'Estudiar para el certamen',
      description: 'Repasar React Hook Form y esquemas Zod',
    };

    const result = createTaskSchema.safeParse(validData);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.title).toBe('Estudiar para el certamen');
      expect(result.data.description).toBe(
        'Repasar React Hook Form y esquemas Zod'
      );
    }
  });

  // Test 2: Comportamiento con campos opcionales
  it('debe permitir crear una tarea sin descripcion (campo opcional)', () => {
    const validDataWithoutDescription = {
      title: 'Comprar cuaderno',
    };

    const result = createTaskSchema.safeParse(
      validDataWithoutDescription
    );

    expect(result.success).toBe(true);
  });

  // Test 3: Validacion de campo obligatorio vacio
  it('debe rechazar la tarea si el titulo esta vacio', () => {
    const invalidData = {
      title: '',
    };

    const result = createTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const titleError = issues.find((issue) =>
        issue.path.includes('title')
      );

      expect(titleError).toBeDefined();
      expect(titleError.message).toBe(
        'El título es obligatorio'
      );
    }
  });

  // Test 4: Validacion de longitud minima
  it('debe rechazar la tarea si el titulo tiene menos de 3 caracteres', () => {
    const invalidData = {
      title: 'AB',
    };

    const result = createTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const titleError = issues.find((issue) =>
        issue.path.includes('title')
      );

      expect(titleError).toBeDefined();
      expect(titleError.message).toBe(
        'El título debe tener al menos 3 caracteres'
      );
    }
  });

  // Test 5: Validacion de longitud maxima en titulo
  it('debe rechazar la tarea si el titulo supera los 150 caracteres', () => {
    const invalidData = {
      title: 'A'.repeat(151),
    };

    const result = createTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const titleError = issues.find((issue) =>
        issue.path.includes('title')
      );

      expect(titleError).toBeDefined();
      expect(titleError.message).toBe(
        'El título no puede superar los 150 caracteres'
      );
    }
  });

  // Test 6: Validacion de longitud maxima en descripcion
  it('debe rechazar la tarea si la descripcion supera los 500 caracteres', () => {
    const invalidData = {
      title: 'Tarea con descripcion muy larga',
      description: 'X'.repeat(501),
    };

    const result = createTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const descError = issues.find((issue) =>
        issue.path.includes('description')
      );

      expect(descError).toBeDefined();
      expect(descError.message).toBe(
        'La descripción no puede superar los 500 caracteres'
      );
    }
  });
});


// ============================================================
// PRUEBAS PARA updateTaskSchema
// ============================================================

describe('Pruebas unitarias: updateTaskSchema (Zod)', () => {
  // Test 1: Datos completamente validos
  it('debe validar correctamente una tarea con todos sus campos', () => {
    const validData = {
      title: 'Estudiar para el certamen',
      description: 'Repasar React Hook Form y Zod',
      completed: true,
    };

    const result = updateTaskSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  // Test 2: Campos opcionales
  it('debe permitir actualizar una tarea sin descripcion ni completed', () => {
    const validData = {
      title: 'Comprar cuaderno',
    };

    const result = updateTaskSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  // Test 3: Titulo demasiado corto
  it('debe rechazar la tarea si el titulo tiene menos de 3 caracteres', () => {
    const invalidData = {
      title: 'AB',
    };

    const result = updateTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const titleError = issues.find((issue) =>
        issue.path.includes('title')
      );

      expect(titleError).toBeDefined();
      expect(titleError.message).toBe(
        'El título debe tener al menos 3 caracteres'
      );
    }
  });

  // Test 4: Titulo demasiado largo
  it('debe rechazar la tarea si el titulo supera los 150 caracteres', () => {
    const invalidData = {
      title: 'A'.repeat(151),
    };

    const result = updateTaskSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const issues = result.error.issues;
      const titleError = issues.find((issue) =>
        issue.path.includes('title')
      );

      expect(titleError).toBeDefined();
      expect(titleError.message).toBe(
        'El título no puede superar los 150 caracteres'
      );
    }
  });
});
  // DEMOSTRACION EN CLASE: CASO DISENADO PARA FALLAR
  // Descomenta las lineas de abajo para ver como Vitest reporta un error en consola:
  // it('DEMO CLASE: debe fallar intencionalmente para mostrar un error en Vitest', () => {
  //   const invalidData = {
  //     title: 'AB',
  //   };
  //   const result = createTaskSchema.safeParse(invalidData);
  //   expect(result.success).toBe(true);
  // });

