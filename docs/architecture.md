# TrueState Assignment — Architecture Document

This document explains the system architecture, data flow, folder structure, and module responsibilities for the TrueState Sales Analytics Dashboard.

---

# Backend Architecture

## Tech Stack
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose ORM  
- CSV Import Script  
- Render for Deployment  

## Architecture Overview

```
Client (React) 
     ↓ HTTP/HTTPS (Axios)
Backend API (Express.js)
     ↓
MongoDB Atlas (Sales Data)
```

### Responsibilities
- Provide REST API endpoints for sales data  
- Parse query params for filtering, sorting, search & pagination  
- Handle DB operations using Mongoose  
- Import CSV file into MongoDB  
- Deploy backend on Render  

---

## Backend Flow

1. Client sends a GET request to `/api/sales`
2. Query parameters include:
   - `search`, `region`, `gender`, `category`, `tags`, `payment`
   - `minAge`, `maxAge`, `sortBy`
   - `page`, `limit`
3. Backend controller:
   - Builds dynamic MongoDB query  
   - Applies filters  
   - Applies sorting  
   - Applies pagination  
   - Returns:
     ```
     {
       results: [...],
       total: number
     }
     ```
4. MongoDB responds → Backend sends JSON → Frontend updates UI

---

# Frontend Architecture

## Tech Stack
- React.js  
- Vite  
- Tailwind CSS  
- Axios  
- HeroIcons  
- Headless UI (Combobox MultiSelect)  
- Vercel for Deployment  

## Architecture Overview (Component Level)

```
Dashboard Page
│
├── TopBar (Search + Sort)
├── Filters (Region, Gender, Age, Category, Tags, Payment)
├── StatsCards (Total metrics)
├── SalesTable (Data table)
└── Pagination (Page navigation)
```

### React State Flow

```
Filters / Search / Sorting
      ↓ updates
Dashboard State
      ↓ triggers
Axios API Call → Backend
      ↓ response
SalesTable + StatsCards + Pagination render
```

### Responsibilities
- Manage UI state  
- Convert filters to backend-friendly format  
- Call backend API using Axios  
- Render sales records  
- Display totals + pagination  

---

# Data Flow Diagram

```
                +---------------------+
                |     Frontend UI     |
                | (Filters, Search)   |
                +----------+----------+
                           |
                           | Axios Request
                           v
                +----------+-----------+
                |     Backend API      |
                | /api/sales           |
                +----------+-----------+
                           |
                           | Mongo Query (with filters)
                           v
                +----------+-----------+
                |     MongoDB Atlas    |
                +----------+-----------+
                           |
                           | JSON Response
                           v
                +----------+-----------+
                |   Frontend Render    |
                +----------------------+
```

---

# Folder Structure

## Backend

```
backend/
├── src/
│   ├── controllers/
│   │   └── salesController.js
│   ├── models/
│   │   └── Sales.js
│   ├── routes/
│   │   └── salesRoutes.js
│   ├── utils/
│   ├── importData.js
│   └── index.js
│
├── package.json
└── .env
```

---

## Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── Filters.jsx
│   │   ├── TopBar.jsx
│   │   ├── StatsCards.jsx
│   │   ├── SalesTable.jsx
│   │   ├── Pagination.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Module Responsibilities

## Backend Modules

### **controllers/salesController.js**
- Reads filters from query params  
- Builds MongoDB query object  
- Applies sorting  
- Applies pagination  
- Returns `{ results, total }`

### **models/Sales.js**
- Defines Sales schema  
- Maps CSV → MongoDB model  

### **routes/salesRoutes.js**
- Defines API route `/api/sales`  
- Connects route → controller  

### **importData.js**
- Reads CSV  
- Inserts data into MongoDB  

### **index.js**
- Express server setup  
- MongoDB connection  
- Route registration  

---

## Frontend Modules

### **Filters.jsx**
- Region / Gender multi-select  
- Age range dropdown  
- Category / Tag / Payment selects  
- Reset button  
- Updates parent filters  

### **TopBar.jsx**
- Search bar  
- Sorting dropdown  
- Debounce search  

### **StatsCards.jsx**
- Shows total units  
- Shows total amount  
- Shows total discount  

### **SalesTable.jsx**
- Displays table of sales  
- Handles loading / empty state  

### **Pagination.jsx**
- Sliding window pagination  
- Next/Prev buttons  

### **api.js**
- Axios instance  
- getSales() API wrapper  

### **Dashboard.jsx**
- Main page  
- Holds all filters + API data  