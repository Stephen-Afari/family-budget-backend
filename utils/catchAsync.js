module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); //atches any errors that occur during the execution of fn. If an error is caught, it passes the error to the next function, which is how Express.js handles errors (by forwarding them to the error-handling middleware).
    };
  };