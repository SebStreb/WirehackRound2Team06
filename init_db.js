const Database = require('./models/db_connect');
const User = require('./models/user');
const Proposal = require('./models/proposal');
const Loan = require('./models/loan');
const Payment = require('./models/payment');
const Project = require('./models/project');
const Review = require('./models/review');

const db = new Database('./db.sqlite');

const user = new User(db);
const proposal = new Proposal(db);
const loan = new Loan(db);
const payment = new Payment(db);
const project = new Project(db)
const review = new Review(db);

user.createTable().catch((err) => console.error("user: " + err));
proposal.createTable().catch((err) => console.error("proposal: " + err));
loan.createTable().catch((err) => console.error("loan: " + err));
payment.createTable().catch((err) => console.error("payment: " + err));
project.createTable().catch((err) => console.error("project: " + err));
review.createTable().catch((err) => console.error("review: " + err));

//user.create("admin", "admin", "Sébastien", "Strebelle", "test@gmail.com")
