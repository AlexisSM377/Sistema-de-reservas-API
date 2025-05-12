import { z } from 'zod'

export const createSpaceSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres'),
  capacidad: z.number().int().min(1, 'La capacidad debe ser un número entero mayor que 0'),
  descripcion: z.string().optional()
})

export const updateSpaceSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres').optional(),
  capacidad: z.number().int().min(1, 'La capacidad debe ser un número entero mayor que 0').optional(),
  descripcion: z.string().optional()
})
