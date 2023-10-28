import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../api/categories";
import { getExpenseData, getExpenses } from "../../api/expenses";
import { addCategories } from "../../store/slices/categorySlice";
import {
  addExpenses,
  updateDashboardData,
} from "../../store/slices/expenseSlice";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import formatCurrency from "../../utils/formatCurrency";

const Dashboard = () => {
  const { token, userData } = useSelector((state) => state.auth);
  let { themeMode } = useSelector((state) => state.theme);
  const { dashboard } = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const [totalExpenses, setTotalExpenses] = useState(dashboard.total_expenses);
  const [totalAmount, setTotalAmount] = useState(dashboard.total_amount);
  const [totalAmountMonth, setTotalAmountMonth] = useState(
    dashboard.total_amount_month
  );
  const [totalExpensesByCategory] = useState(
    dashboard.total_expenses_by_category
  );
  const [labels, setLabels] = useState(
    totalExpensesByCategory.map((item) => item.category_name)
  );
  const [amountArray, setAmountArray] = useState(
    totalExpensesByCategory.map((item) => item.total_amount)
  );
  const [dataAnimation, setDataAnimation] = useState("");
  const [barAnimation, setBarAnimation] = useState("");

  const fetchExpenseData = useCallback(() => {
    if (dashboard.total_expenses === 0) {
      setDataAnimation("animate-pulse");
      setBarAnimation("animate-pulse");
    }
    const response = getExpenseData(token);
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch(updateDashboardData({ dashboard: data }));
        if (dashboard.total_expenses === 0) {
          setTotalExpenses(data.total_expenses);
          setTotalAmount(data.total_amount);
          setTotalAmountMonth(data.total_amount_month);
          setLabels(
            data.total_expenses_by_category.map((item) => item.category_name)
          );
          setAmountArray(
            data.total_expenses_by_category.map((item) => item.total_amount)
          );
        }
      })
      .finally(() => {
        setDataAnimation("");
        setBarAnimation("");
      })
      .catch((error) => console.error(error));
  }, [totalExpenses, totalAmount]);

  const fetchCategories = () => {
    const response = getCategories(token);
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch(addCategories(data));
      })
      .catch((error) => console.error(error));
  };

  const fetchExpenses = () => {
    const response = getExpenses(token);
    response
      .then((res) => res.json())
      .then((data) => {
        dispatch(addExpenses({ data: data }));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchExpenseData();
  }, [totalExpenses, totalAmount]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  return (
    <div>
      <h1 className="dark:text-secondary">{userData?.email}</h1>
      <h1 className="text-3xl text-quaternary dark:text-secondary font-extrabold">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-3 grid-cols-1 min-[380px]:grid-cols-2 gap-4 mt-4">
        <div className="data-card">
          <h1 className="text-base sm:text-lg font-semibold">Total Expenses</h1>
          <div className={`data-card-title ${dataAnimation}`}>
            {totalExpenses}
          </div>
        </div>
        <div className="data-card">
          <h1 className="text-base sm:text-lg font-semibold">Total Amount</h1>
          <div className={`data-card-title ${dataAnimation}`}>
            {formatCurrency(totalAmount, "INR", "en-IN")}
          </div>
        </div>
        <div className="data-card">
          <div className="flex items-center">
            <h1 className="text-base sm:text-lg font-semibold">
              Amount This Month
            </h1>
          </div>
          <div className={`data-card-title ${dataAnimation}`}>
            {formatCurrency(totalAmountMonth, "INR", "en-IN")}
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="h-[20rem] max-sm:h-[18rem] w-full rounded-md shadow-md px-3 bg-secondary/25 text-quaternary/40 dark:bg-tertiary">
          <Bar
            className={barAnimation}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Rs.",
                  data: amountArray,
                  backgroundColor: "rgb(241, 180, 187)",
                  borderWidth: 2,
                  borderColor: themeMode === "light" ? "#132043" : "#132043",
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  ticks: {
                    color: themeMode === "light" ? "#132043" : "#F1B4BB",
                    stepSize: 1000,
                  },
                  grid: {
                    color:
                      themeMode === "light"
                        ? "rgb(19, 32, 67, 0.2)"
                        : "#132043",
                    tickColor:
                      themeMode === "light"
                        ? "rgb(19, 32, 67, 0.2)"
                        : "#132043",
                  },
                },
                x: {
                  ticks: {
                    color: themeMode === "light" ? "#132043" : "#F1B4BB",
                  },
                  grid: {
                    color:
                      themeMode === "light"
                        ? "rgb(19, 32, 67, 0.2)"
                        : "#132043",
                    tickColor:
                      themeMode === "light"
                        ? "rgb(19, 32, 67, 0.2)"
                        : "#132043",
                  },
                },
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      family: "sans-serif",
                      size: 12,
                      color: themeMode === "light" ? "#132043" : "#F1B4BB",
                    },
                  },
                },
                title: {
                  display: true,
                  text: "Expense by category - This month",
                  color: themeMode === "light" ? "#132043" : "#F1B4BB",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
