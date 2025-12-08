# TrueState Assignment – Backend

This is the backend service for the **TrueState Sales Dashboard**, built using  
**Node.js, Express, MongoDB, and Mongoose**.

It supports:

- Pagination  
- Search  
- Sorting  
- Region / Gender / Category Filters  
- Tags & Payment Filters  
- Age Range Filter  

Backend is deployed on **Render**, database on **MongoDB Atlas**.

---

## Tech Stack
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- Cors  
- Dotenv  

---


## Folder Structure

    backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── utils/
    │   ├── services/
    │   ├── importData.js
    │   └── index.js
    │
    ├── package.json
    └── .env


---

## API Base URL (Production)


---

##  API Endpoints

### **GET /api/sales**
Fetch paginated + filtered sales data.

#### Example: GET /api/sales?page=1&limit=10


#### Advanced example: /api/sales?region=North,South&gender=Female&minAge=18&maxAge=30

# API Testing (Postman)

Below are screenshots of API requests made in **Postman** to verify backend functionality.

### 1. Basic GET request (first 10 records)


### 2. Search request by customer name

### 3. Filter by region & gender

### 4. Pagination test