
import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const DB_FILE = "./db.json";

app.use(cors()); // Allow all origins for dev
app.use(bodyParser.json());

// Utility functions
function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ---------------------- ROUTES ------------------------

// Signup
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const db = readDB();

  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  db.users.push({
    username,
    email,
    password,
    cookies: "",
    public: false,
    friends: [],
    addedBy: []
  });

  writeDB(db);
  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

// Get all users (for Global section)
app.get("/allUsers", (req, res) => {
  const db = readDB();
  res.json(db.users.map(({ password, cookies, ...rest }) => rest));
});

app.get("/user/:email", (req, res) => {
  const db = readDB();
  const email = decodeURIComponent(req.params.email);
  const user = db.users.find(u => u.email === email);
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});
// Add friend
app.post("/add-friend", (req, res) => {
  const { fromEmail, toEmail } = req.body;
  const db = readDB();

  const from = db.users.find(u => u.email === fromEmail);
  const to = db.users.find(u => u.email === toEmail);

  if (!from || !to) return res.status(404).json({ error: "User not found" });

  if (!from.friends.includes(toEmail)) from.friends.push(toEmail);
  if (!to.addedBy.includes(fromEmail)) to.addedBy.push(fromEmail);

  writeDB(db);
  res.json({ message: "Friend added" });
});

// Remove friend ✅
app.post("/remove-friend", (req, res) => {
  const { fromEmail, toEmail } = req.body;
  const db = readDB();

  const from = db.users.find(u => u.email === fromEmail);
  const to = db.users.find(u => u.email === toEmail);

  if (!from || !to) return res.status(404).json({ error: "User not found" });

  from.friends = from.friends.filter(email => email !== toEmail);
  to.addedBy = to.addedBy.filter(email => email !== fromEmail);

  writeDB(db);
  res.json({ message: "Friend removed" });
});

// Toggle public status (optional)
app.post("/set-public", (req, res) => {
  const { email, publicStatus } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.public = publicStatus;
  writeDB(db);
  res.json({ message: "Status updated" });
});

// Update cookies (after X login)
app.post("/update-cookies", (req, res) => {
  const { email, cookies } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.cookies = cookies;
  writeDB(db);
  res.json({ message: "Cookies updated" });
});

// ---------------------- START ------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
