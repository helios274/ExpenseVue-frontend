import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "../../store/slices/expenseSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { Popover } from "antd";
import {
  deleteExpense,
  getExpenseData,
  getExpenses,
  searchExpenses,
} from "../../api/expenses";
import { toast } from "react-toastify";
import { getCategories } from "../../api/categories";
import { addCategories } from "../../store/slices/categorySlice";
import { updateDashboardData } from "../../store/slices/expenseSlice";

const Expense = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.expense);
  const [expenseData, setExpenseData] = useState(data);
  const [expenses, setExpenses] = useState(expenseData.results);
  const [url, setUrl] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/api/expenses/`
  );
  const [pageInputValue, setPageInputValue] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [ok, setOk] = useState(false);

  const fetchExpenseData = useCallback(() => {
    const response = getExpenseData(token);
    response
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateDashboardData({ dashboard: data }));
      });
  }, []);

  const fetchExpenses = useCallback(
    (url) => {
      const response = getExpenses(token, url);
      response
        .then((res) => res.json())
        .then((data) => {
          setExpenseData(data);
          dispatch(addExpenses({ data: data }));
          setExpenses(data?.results);
        })
        .catch((error) => console.error(error));
    },
    [ok, url]
  );

  const fetchSearchResults = (searchString) => {
    const response = searchExpenses(token, searchString);
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExpenseData(data);
        setExpenses(data.results);
      })
      .catch((error) => console.error(error));
  };

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

  const handleDeleteExpense = (id) => {
    const response = deleteExpense(token, id);
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOk(!ok);
          toast.success(data.message);
        } else {
          console.log(data);
        }
      });
  };

  // fetchExpenses();

  useEffect(() => {
    fetchExpenses(url);
    fetchCategories();
    fetchExpenseData();
  }, [ok, url]);

  return (
    <div className="flex flex-col  dark:bg-tertiary bg-secondary p-2 rounded-lg shadow-lg ">
      {expenseData.count !== 0 ? (
        <>
          <div className="flex flex-col min-[840px]:flex-row mt-3 mb-3 min-[840px]:mb-5">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search here"
                className="search-input peer"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button
                className={`px-2 font-semibold peer-focus:bg-primary dark:peer-focus:bg-quaternary dark:peer-focus:text-primary ${
                  searchString ? "block" : "hidden"
                }`}
                onClick={() => {
                  setSearchString("");
                  setOk(!ok);
                }}
              >
                X
              </button>
              <button
                className="search-btn"
                onClick={() => {
                  if (searchString.length > 2) fetchSearchResults(searchString);
                }}
              >
                Search
              </button>
            </div>
            <div className="flex min-[840px]:ml-auto max-[840px]:mt-3 max-[840px]:justify-center">
              <Link to="/add-expense" className="btn-primary-outline my-0 mr-3">
                Add expense
              </Link>
              <Link to="/categories" className="btn-primary-outline my-0">
                Manage categories
              </Link>
            </div>
          </div>
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-[500px] min-[500px]:w-full text-sm sm:text-base rounded-lg border-none">
              <thead>
                <tr className="dark:bg-secondary bg-quaternary dark:text-quaternary text-primary">
                  <th className="py-3">Amount</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Description</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="text-center border-gray-300 hover:bg-primary/30  dark:hover:bg-secondary/10 dark:text-primary"
                  >
                    <td className="py-3">{expense.amount}</td>
                    <td className="py-3">{expense.category}</td>
                    <td className="py-3">{formatDate(expense.date)}</td>
                    <td className="py-3">{expense.description}</td>
                    <td className="py-3 flex justify-center">
                      <Link
                        to="update"
                        state={expense}
                        className="text-lg border-2 border-quaternary dark:border-secondary hover:bg-quaternary dark:hover:bg-secondary dark:text-secondary dark:hover:text-tertiary hover:text-secondary max-sm:text-base max-sm:py-1 max-sm:px-2 py-1.5 px-3 mx-2 rounded-lg"
                      >
                        <FaEdit />
                      </Link>
                      <Popover
                        content={
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="py-[3px] px-3 bg-red-600 text-primary rounded-md hover:bg-red-800"
                          >
                            Yes
                          </button>
                        }
                        title="Are you sure?"
                        trigger="click"
                        placement="topLeft"
                      >
                        <button className="text-lg border-2 border-red-700 dark:border-red-500 text-red-700 dark:text-red-500 hover:bg-red-700 dark:hover:bg-red-500 hover:text-secondary dark:hover:text-tertiary max-sm:text-base max-sm:py-1 max-sm:px-2 py-1.5 px-3 mx-2 rounded-lg">
                          <RiDeleteBin2Fill />
                        </button>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {expenseData.total_pages > 1 ? (
            <div className="mt-4 flex justify-center items-center">
              <div className="pagination-container">
                <h1 className="py-[4px] max-sm:py-[6px] px-3 max-sm:text-sm max-sm:px-2 font-medium text-primary dark:text-quaternary bg-quaternary dark:bg-secondary">
                  Page {expenseData.current_page} of {expenseData.total_pages}
                </h1>
                <nav>
                  <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                      <button
                        onClick={() => {
                          if (expenseData.previous)
                            setUrl(expenseData.previous);
                        }}
                        disabled={expenseData.previous ? false : true}
                        className="page-prev-btn"
                      >
                        <IoIosArrowBack />
                      </button>
                    </li>
                    <li>
                      <div className="page-btn px-0">
                        <input
                          type="number"
                          min={1}
                          max={expenseData.total_pages}
                          value={pageInputValue}
                          onChange={(e) => setPageInputValue(e.target.value)}
                          className="page-input"
                        />
                        <button
                          className="h-full w-12 max-sm:w-10 max-sm:text-sm bg-secondary hover:bg-secondary/25 font-medium text-quaternary"
                          onClick={() => {
                            setUrl(
                              `${
                                import.meta.env.VITE_BACKEND_URL
                              }/api/expenses/?page=${pageInputValue}`
                            );
                          }}
                        >
                          Go
                        </button>
                      </div>
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          if (expenseData.next) setUrl(expenseData.next);
                        }}
                        disabled={expenseData.next ? false : true}
                        className="page-next-btn"
                      >
                        <IoIosArrowForward />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-9 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">
            You do not have any expenses
          </h1>
          <div className="flex justify-center gap-4 mt-7">
            <Link to="/add-expense" className="btn-primary-outline my-0 mr-3">
              Add expense
            </Link>
            <Link to="/categories" className="btn-primary-outline my-0">
              Add categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
