// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 3001;

// const errorHandler = require("./middleware/errorHandling.js");
// const path = require("path")
// const { adminAuth } = require("./middleware/adminAuth.js")

// app.use(cors());
// app.use(express.json());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// const port = process.env.PORT || 3001;
// const url = process.env.MONGO_URL;
// mongoose
//   .connect(url)
//   .then(() => console.log("Connected to DataBase successfully..."));
  
// app.use('/images', express.static(path.join(__dirname, 'images')));
// const { validateToken } = require("./middleware/validateToken");

// const adminRoutes = require("./routes/admin.route.js");
// const contactController = require("./controllers/contact.controller.js");
// const metricsRoutes = require("./routes/metrics.route.js");

// // app.use("/api/metrics", metricsRoutes);
// // app.post("/api/contact", contactController.postContactForm);
// // app.get("/api/contact", contactController.getContacts);

// //Apply validateToken middleware to the routes that require authentication
// // app.use(adminAuth);
// // app.use("/admin", validateToken, adminRoutes);

// // importing routes
// // //const authRoutes = require("./routes/auth.route.js");
// // const requestRoutes = require("./routes/request.route.js");
// // const donationRoutes = require("./routes/donation.route.js");

// app.use("/api/auth", authRoutes);
// // app.use("/api/requests", validateToken, requestRoutes);
// // app.use("/api/donation", validateToken, donationRoutes);


// // not done
// // app.use("/api/user",validateToken, userRoutes);


// app.use(errorHandler);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Proxy server listening at http://localhost:${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

const errorHandler = require("./middleware/errorHandling.js");
const path = require("path");
const { adminAuth } = require("./middleware/adminAuth.js");
const { validateToken } = require("./middleware/validateToken");

const authRoutes = require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js");
const requestRoutes = require("./routes/request.route.js");
const donationRoutes = require("./routes/donation.route.js");
const userRoutes = require("./routes/user.route.js");

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => console.log("Connected to Database successfully..."));

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Authentication Routes (open to all)
app.use("/api/auth", authRoutes);

// Apply validateToken middleware for protected routes
// app.use("/api/user", validateToken, userRoutes);
// app.use("/api/requests", validateToken, requestRoutes);
// app.use("/api/donation", validateToken, donationRoutes);

// Admin Routes (apply adminAuth for restricted access)
// app.use("/admin", validateToken, adminAuth, adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
