# 💼 Job Portal — MongoDB + Spring Boot + React

## Tech Stack
- Frontend: React.js + CSS
- Backend: Java Spring Boot + JWT
- Database: MongoDB (No password needed!)

---

## ⚙️ What You Need to Install

| Tool       | Version | Download Link                              |
|------------|---------|---------------------------------------------|
| Java JDK   | 17+     | https://adoptium.net                        |
| Maven      | 3.8+    | https://maven.apache.org/download.cgi       |
| Node.js    | 18+     | https://nodejs.org                          |
| MongoDB    | 6+      | https://www.mongodb.com/try/download/community |

---

## 🍃 Step 1 — Install & Start MongoDB

1. Go to https://www.mongodb.com/try/download/community
2. Select: Version 7.0, Platform: Windows, Package: msi
3. Run the installer → choose "Complete" setup
4. CHECK the box: "Install MongoDB as a Service" ✅
5. Click Next → Install → Finish

MongoDB will start automatically. No password needed!

**Verify MongoDB is running — open PowerShell:**
```
Get-Service -Name MongoDB
```
You should see: Status = Running ✅

**If not running, start it:**
```
net start MongoDB
```

---

## ☕ Step 2 — Install Java JDK 17

1. Go to https://adoptium.net
2. Download Windows x64 .msi installer
3. Run it → make sure "Set JAVA_HOME" is CHECKED
4. Finish installation

**Verify:**
```
java -version
```
Expected: openjdk version "17.x.x"

---

## 🔧 Step 3 — Install Maven

1. Go to https://maven.apache.org/download.cgi
2. Download "Binary zip archive" → apache-maven-3.x.x-bin.zip
3. Extract to C:\maven

**Add to PATH:**
- Press Windows key → search "Environment Variables"
- System Variables → Path → Edit → New
- Add: C:\maven\bin
- Click OK on all windows

**Verify (open new PowerShell):**
```
mvn -version
```

---

## 🟢 Step 4 — Install Node.js

1. Go to https://nodejs.org
2. Download LTS version (.msi)
3. Run installer → all defaults

**Verify:**
```
node -version
npm -version
```

---

## 📂 Step 5 — Extract the Project

1. Extract job-portal-mongo.zip to C:\projects\job-portal
2. Your folder should look like:
```
C:\projects\job-portal\
  ├── job-portal-backend\
  ├── job-portal-frontend\
  └── README.md
```

---

## 🚀 Step 6 — Run the Backend

Open PowerShell:
```
cd C:\projects\job-portal\job-portal-backend
mvn clean install
mvn spring-boot:run
```

Wait for:
```
Tomcat started on port(s): 8080
Started JobPortalApplication
```

---

## 💻 Step 7 — Run the Frontend

Open a NEW PowerShell window:
```
cd C:\projects\job-portal\job-portal-frontend
npm install
npm start
```

Wait for:
```
Compiled successfully!
Local: http://localhost:3000
```

---

## ✅ Open Your Browser

👉 http://localhost:3000

Register a new account or use the app fresh — no seed data needed with MongoDB!

---

## ⚡ Every Time You Want to Run

Terminal 1 — Backend:
```
cd C:\projects\job-portal\job-portal-backend
mvn spring-boot:run
```

Terminal 2 — Frontend:
```
cd C:\projects\job-portal\job-portal-frontend
npm start
```

---

## 🆘 Common Errors

**MongoDB not running:**
```
net start MongoDB
```

**Port 8080 in use:**
```
netstat -ano | findstr :8080
taskkill /PID <number> /F
```

**npm install fails:**
```
npm cache clean --force
npm install
```

**mvn not recognized:**
Close and reopen PowerShell after adding to PATH.
