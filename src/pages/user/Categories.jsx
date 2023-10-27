import React, { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../api/categories";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  addToCategories,
  addCategories,
} from "../../store/slices/categorySlice";

const Categories = () => {
  const { token } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = () => {
    const response = getCategories(token);
    response
      .then((res) => res.json())
      .then((data) => {
        dispatch(addCategories(data));
      })
      .catch((error) => console.error(error));
  };

  const handleCreateCategory = () => {
    const response = createCategory(token, { name: newCategory });
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          fetchCategories();
          setNewCategory("");
          toast.success(data.message);
        } else {
          // console.log(data);
          toast.error(data.errors[0].detail);
        }
      });
  };

  return (
    <div className="flex justify-center">
      <ul className="md:w-[330px]">
        <li className="my-3 shadow-md bg-secondary">
          <div className="flex">
            <input
              type="text"
              className="py-3 px-3 outline-none border-none focus:outline-none focus:border-none flex-grow sm:w-[205px] max-[450px]:py-2 max-[450px]:text-sm"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              onClick={handleCreateCategory}
              children="Add"
              className="ml-auto w-[70px] font-medium max-[450px]:text-sm bg-tertiary text-primary hover:bg-quaternary hover:text-primary"
            />
          </div>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="my-3 shadow-md bg-secondary">
            <div className="flex" key={category.id}>
              <span className="ml-3 py-3 max-[450px]:py-2 max-[450px]:text-sm">
                {category.name}
              </span>
              <Link
                to={`${category.id}/update`}
                state={{ name: category.name }}
                className="flex justify-center items-center ml-auto w-[70px] font-medium max-[450px]:text-sm bg-tertiary text-primary hover:bg-quaternary hover:text-primary"
              >
                Update
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
