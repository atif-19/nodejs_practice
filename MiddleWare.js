
// implementing log middleware
// in middle ware we do not use next when we use async/await
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
}

module.exports = logRequest;