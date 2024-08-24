const fs = require('fs');

const budgetIncome = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/budg-inc`))

exports.getAllBudgInc = (req, res) => {
    console.log(req.requestTime);
  
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: budgetIncome.length,
      data: {
        budgetIncome
      }
    });
  };