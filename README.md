**Family Budget Tracker**:
A full-stack web application for tracking and managing family budgets, incomes, and expenses. The app is built using React (frontend) and Node.js with Express (backend). The backend connects to a MongoDB database to store and retrieve financial data.
________________________________________
Features:
•	User authentication and authorization.
•	Track actual incomes and expenses.
•	Plan and compare budgeted vs. actual transactions.
•	Dynamic data visualization using charts.
•	Export data for analysis.
•	Responsive design for better user experience.
•	Secure backend with JWT authentication and rate-limiting.
________________________________________
Technologies Used:
Frontend:
•	React
•	React Query
•	Redux Toolkit
•	Styled Components
•	React Router
•	Recharts for data visualization
Backend:
•	Node.js
•	Express
•	MongoDB (via Mongoose)
•	JWT Authentication
•	Helmet, CORS, XSS Protection
•	Express-rate-limit for rate limiting
________________________________________
Installation
Prerequisites:
•	Node.js (v14+)
•	MongoDB (local or cloud-based)
•	Git
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/family-budget-tracker.git
cd family-budget-tracker
________________________________________
Backend Setup:
1.	Navigate to the backend folder:
bash
Copy code
cd family-budget-backend
2.	Install dependencies:
bash
Copy code
npm install
3.	Environment Variables: Create a .env file in the root of the backend folder and configure the following:
env
Copy code
PORT=5000
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/family-budget
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
4.	Run the backend server:
bash
Copy code
npm start
________________________________________
Frontend Setup:
1.	Navigate to the frontend folder:
bash
Copy code
cd family-budget-frontend
2.	Install dependencies:
bash
Copy code
npm install
3.	Environment Variables: Create a .env file in the frontend folder and configure the backend URL:
env
Copy code
REACT_APP_API_URL=https://family-budget-backend.onrender.com/api/v1
4.	Run the frontend:
bash
Copy code
npm start
________________________________________
Usage:
1.	Login or Signup as a new user.
2.	Add actual income and transactions.
3.	Set up planned budgets and compare them with actual data.
4.	View data through interactive charts and visualizations.
5.	Export data to an Excel file for offline analysis.
________________________________________
API Endpoints
Authentication:
•	POST /api/v1/users/login - User login.
•	POST /api/v1/users/signup - User signup.
Actual Data
•	GET /api/v1/actincome - Fetch all actual incomes.
•	GET /api/v1/acttrxn - Fetch all actual transactions.
Budgeted Data
•	GET /api/v1/budginc - Fetch all budgeted incomes.
•	GET /api/v1/budgtrxn - Fetch all budgeted transactions.
CRUD Operations
•	POST, PATCH, DELETE for incomes and transactions.
________________________________________
Code Highlights
Frontend:
React Query for Fetching Data
javascript
Copy code
const { data, isLoading } = useQuery("actual_incomes", () => fetchAllActualIncomes(token), {
  onSuccess: (data) => {
    dispatch(setActualApiIncomes(data.data.data));
  },
});
Redux for State Management
javascript:
Copy code
export const USERS_INITIAL_STATE = {
  users: {},
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};
Backend:
JWT Authentication Middleware
javascript
Copy code
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError("Unauthorized", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
Rate Limiting
javascript
Copy code
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
________________________________________
Troubleshooting:
•	CORS Errors: Ensure the backend includes the following:
javascript
Copy code
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://family-budget-backend.onrender.com/api/v1/' // Deployed frontend on Render.com
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true // Allow cookies and credentials
}));
•	Too Many Requests: Adjust the max value in the rate limiter.
________________________________________
Contributing:
1.	Fork the repository.
2.	Create a new branch:
bash
Copy code
git checkout -b feature/your-feature
3.	Commit your changes:
bash
Copy code
git commit -m "Add new feature"
4.	Push to the branch:
bash
Copy code
git push origin feature/your-feature
5.	Open a pull request.
________________________________________



