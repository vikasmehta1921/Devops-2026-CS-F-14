export function notFound(req,res,next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}
export function errorHandler(err,req,res,next) {
  console.error(err);
  res.status(res.statusCode >= 400 ? res.statusCode : 500).json({message:err.message || "Server error"});
}
