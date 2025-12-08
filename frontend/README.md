# TrueState Assignment — Frontend

This is the **frontend application** for the TrueState Sales Analytics Dashboard.  
It is built using **React + Vite**, styled with **Tailwind CSS**, and communicates with the backend using **Axios**.

---

## Live Demo
**Frontend Deployment:** https://true-state-assignment-amber.vercel.app/  
**Backend API:** https://truestate-assignment-iqlf.onrender.com/api/sales

---

## Features

- **Search** by name or phone number  
- **Multi-filtering** (Region, Gender, Age Range, Category, Tags, Payment Method)  
- **Reset Filters** button  
- **Statistics Cards**  
- **Pagination with sliding window**  
- **Beautiful UI** with TailwindCSS  
- **Axios + Backend Integration**  
- **Fast Vite-powered development**

---

## Tech Stack

### **Frontend**
- React.js  
- Vite  
- Tailwind CSS  
- HeroIcons  
- Axios  
- Headless UI (Combobox filters)

---

## Folder Structure

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
├── public/
├── package.json
└── vite.config.js
```

---

## Environment Variables

Create a `.env` file in the **frontend root**:

```
VITE_API_BASE="https://truestate-assignment-iqlf.onrender.com/api"
```

This ensures your frontend can call your deployed backend.

---

## API Integration (Axios)

We use a reusable Axios instance:

```js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
  timeout: 15000,
});

export const getSales = (filters) =>
  API.get("/sales", {
    params: {
      ...filters,
      region: filters.region.join(","),
      gender: filters.gender.join(","),
      category: filters.category.join(","),
      tags: filters.tags.join(","),
      payment: filters.payment.join(","),
    },
  });
```