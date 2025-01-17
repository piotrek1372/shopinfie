import axios from "axios";
import 'react-native-dotenv'

// Podstawowy adres URL API WooCommerce
const BASE_URL = 'https://shopinfie.com/wp-json';
const LOGIN_ENDPOINT = "/jwt-auth/v1/token";
const PRODUCTS_ENDPOINT = "/wc/v3/products";
const CART_ENDPOINT = "/wc/v3/cart";

export const fetchCart = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${CART_ENDPOINT}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

// Klucze API WooCommerce (przenieś je do zmiennych środowiskowych!)
const CONSUMER_KEY = process.env.CK;
const CONSUMER_SECRET = process.env.CS;

// *** 1. Funkcja logowania użytkownika ***
export const loginToWooCommerce = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, {
      username: email, // Email użytkownika
      password: password, // Hasło użytkownika
    });

    if (response.data && response.data.token) {
      return {
        token: response.data.token, // Token JWT
        user: response.data.user_nicename, // Nazwa użytkownika
      };
    } else {
      throw new Error("Nieprawidłowe dane logowania");
    }
  } catch (error) {
    console.error("Błąd logowania:", error.message);
    throw new Error("Nie udało się zalogować. Sprawdź swoje dane logowania.");
  }
};

// *** 2. Funkcja pobierania produktów ***
export const fetchProducts = async (token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Dodanie tokena (jeśli użytkownik jest zalogowany)
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${BASE_URL}${PRODUCTS_ENDPOINT}`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        per_page: 10, // Number of products per page
        page: currentPage, // Current page
      },
      headers,
    });    

    return response.data; // Lista produktów
  } catch (error) {
    console.error("Błąd podczas pobierania produktów:", error.message);
    throw new Error("Nie udało się pobrać listy produktów.");
  }
};

// *** 3. Funkcja dodawania produktu do koszyka ***
export const addToCart = async (token, productId, quantity = 1) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${CART_ENDPOINT}`,
      { product_id: productId, quantity },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Zaktualizowany koszyk
  } catch (error) {
    console.error("Błąd dodawania produktu do koszyka:", error.message);
    throw new Error("Nie udało się dodać produktu do koszyka.");
  }
};

const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

authAxios.interceptors.request.use((config) => {
  const token = getAuthToken(); // Retrieve token from storage/context
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default authAxios;
