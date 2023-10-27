const url = `${import.meta.env.VITE_BACKEND_URL}/api/expenses/`;

export const addExpense = (token, data) => {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getExpenses = (token, url) => {
  const response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateExpense = (token, data, id) => {
  const response = fetch(`${url}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteExpense = (token, id) => {
  const response = fetch(`${url}${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const searchExpenses = (token, searchString) => {
  const response = fetch(`${url}?search=${searchString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getExpenseData = (token) => {
  const response = fetch(`${url}data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
