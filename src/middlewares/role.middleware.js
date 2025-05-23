function authorizeRoles (allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.rol
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Acceso denegado por rol' })
    }
    next()
  }
}

export default authorizeRoles
