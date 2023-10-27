import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout..jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/auth/Login.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Dashboard from "./pages/user/Dashboard";
import Private from "./routes/Private";
import Register from "./pages/auth/Register";
import Expense from "./pages/user/Expense";
import AddExpense from "./pages/user/AddExpense";
import Categories from "./pages/user/Categories";
import UpdateCategory from "./pages/user/UpdateCategory";
import UpdateExpense from "./pages/user/UpdateExpense";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<Private />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expense />} />
          <Route path="expenses/update" element={<UpdateExpense />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id/update/" element={<UpdateCategory />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
