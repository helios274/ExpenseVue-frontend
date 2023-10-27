import React, { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../../components/cards/AuthCard";
import { addExpense } from "../../api/expenses";

const AddExpense = () => {
  const { token } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories.data);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [btnText, setBtnTxt] = useState("Add");
  const [spinner, setSpinner] = useState(false);

  function handleAddExpense(data) {
    setBtnTxt(`Adding`);
    setSpinner(true);
    const response = addExpense(token, data);
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          toast.success(data.message);
          navigate("/expenses");
        } else {
          console.log(data);
          toast.error("Error occurred while adding the expense");
        }
      })
      .finally(() => {
        setBtnTxt("Add");
        setSpinner(false);
      });
  }

  return (
    <div className="flex justify-center">
      <AuthCard title="Add Expense" cardClass="mt-3">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleAddExpense)}
        >
          <SelectBox
            label="Category"
            options={categories}
            {...register("category", { required: true })}
          />
          {errors.category && (
            <p className="field-error-msg">This field is required</p>
          )}
          <InputBox
            label="Amount"
            type="number"
            step={0.01}
            min={0}
            max={10000000.0}
            {...register("amount", { required: true })}
          />
          <InputBox
            label="Description"
            type="text"
            {...register("description", { required: false })}
          />
          <InputBox
            label="Date"
            type="date"
            {...register("date", { required: true })}
          />
          <Button
            className="btn-primary-outline mt-4"
            type="submit"
            spin={spinner}
          >
            {btnText}
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default AddExpense;
