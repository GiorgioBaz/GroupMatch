const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
require("dotenv").config({ path: "./config.env" });

const app = express();

const port = process.env.PORT || 5000;
// Connect to the database
mongoose
	.connect(process.env.DB, { useNewUrlParser: true })
	.then(() => console.log(`Database connected successfully`))
	.catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credential: true
}))

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUnintialized: true
}));

app.use(cookieParser("secretcode"))

app.post("/login", (req, res) => {
    console.log(req.body);
})

app.post("/register", (req, res) => {
    console.log(req.body);
    User,findOne({username: req.body.username}, (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});

app.get("/user", (req, res) => {});






app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});