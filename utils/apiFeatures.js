class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      //replaced req.query with this .queryString
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
      //console.log(req.query, queryObj);
      //1B)Advanced Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //A regular expression (/\b(gte|gt|lte|lt)\b/g) is used to find certain comparison operators (gte, gt, lte, lt) in the string. These are often used in API queries to specify "greater than", "less than", etc.The replace function adds a $ symbol before each operator, transforming them into MongoDB query operators ($gte, $gt, $lte, $lt), which Mongoose understands.
      console.log(JSON.parse(queryStr));
  
      this.query = this.query.find(JSON.parse(queryStr));
      //let query = Tour.find(JSON.parse(queryStr)); ... replaced with the above code
      return this;
    }
    sort() {
      //this.queryString.sort refers to the sort parameter in the query string of the HTTP request.
      //For example, if the request URL is /api/v1/tours?sort=price,duration, then this.queryString.sort would be 'price,duration'.
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        //console.log(sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      //Page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }
  
  module.exports = APIFeatures;
  