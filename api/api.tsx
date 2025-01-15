const BASE_URL = 'https://shopinfie.com/wp-json/wc/v3';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?consumer_key=ck_ec118eb483ed40346c3afff1e60c74aa8e6f3065&consumer_secret=cs_741fe651bebb7f10926396cbb9af8f2c85872af9`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
