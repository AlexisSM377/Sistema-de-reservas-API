function authorizeRoles (allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user
    if (!user) return res.status(401).json({ error: 'No autenticado' })

    const userRole = user.rol // este campo debe venir del JWT

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Acceso denegado por rol' })
    }

    next()
  }
}

export default authorizeRoles
