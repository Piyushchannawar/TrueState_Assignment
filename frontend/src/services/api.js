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
