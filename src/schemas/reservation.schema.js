import { z } from 'zod'

const estadoEnum = z.enum([
  'Pendiente',
  'Aprobada',
  'Rechazada',
  'Cancelada'
])

export const createReservationSchema = z.object({
  folio_reserva: z.string().min(5),
  fecha_reserva: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha incorrecto'),
  hora_inicio: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
  hora_final: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
  descripcion: z.string().optional(),
  estado: estadoEnum.default('Pendiente'),
  id_usuario: z.string().uuid(),
  id_espacio: z.string().uuid(),
  id_departamento: z.string().uuid()
})

export const updateEstadoSchema = z.object({
  estado: estadoEnum
})
