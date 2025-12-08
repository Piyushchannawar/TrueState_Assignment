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
<img width="1614" height="1107" alt="image" src="https://github.com/user-attachments/assets/9f811ee6-2d1e-42ec-badc-85e1f951bce5" />

### 2. Search request by customer name
<img width="1651" height="1126" alt="image" src="https://github.com/user-attachments/assets/28bbba1c-e026-45d0-a1fb-19d58a69f4bb" />

### 3. Filter by region & gender
<img width="1595" height="1108" alt="image" src="https://github.com/user-attachments/assets/000b16db-d531-420e-a130-b7cbc0357368" />

### 4. Pagination test
<img width="1617" height="1139" alt="image" src="https://github.com/user-attachments/assets/4efde08d-1c8d-4906-881c-1d20145829c6" />
