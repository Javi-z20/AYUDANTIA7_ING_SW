import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTaskSchema } from '../schemas/task.schema';
import tasksService from '../services/tasks.service';

export function EditTaskModal({ task, onTaskUpdated, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || '',
      completed: task.completed,
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description || '',
      completed: task.completed,
    });
  }, [task, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedTask = await tasksService.update(task.id, data);

      if (onTaskUpdated) {
        onTaskUpdated(updatedTask);
      }

      onClose();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Editar tarea
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Título *
            </label>

            <input
              type="text"
              {...register('title')}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
            />

            {errors.title && (
              <p className="text-rose-400 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Descripción
            </label>

            <textarea
              {...register('description')}
              rows="4"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
            />

            {errors.description && (
              <p className="text-rose-400 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('completed')}
              className="w-4 h-4"
            />

            <label className="text-sm text-slate-300">
              Tarea completada
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}