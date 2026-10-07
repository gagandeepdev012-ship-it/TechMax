export const notFound = (req, res) => res.status(404).json({ message: 'Route not found' });
export const errorHandler = (err, req, res, next) => {
  const code = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : err.status || 500;
  res.status(code).json({ message: err.message || 'Server error' });
};
