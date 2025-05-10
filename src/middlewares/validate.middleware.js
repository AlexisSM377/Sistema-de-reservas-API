function validate (schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = result.error.errors.map(err => err.message)
      return res.status(400).json({ errors })
    }
    req.body = result.data // datos ya validados
    next()
  }
}

export default validate
