import React, { useState } from "react";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../../components/cards/AuthCard";
import { updateExpense } from "../../api/expenses";

const AddExpense = () => {
  const { token } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories.data);
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: state.category,
      amount: state.amount,
      description: state.description,
      date: state.date,
    },
  });
  const [btnText, setBtnTxt] = useState("Update");
  const [spinner, setSpinner] = useState(false);

  function handleUpdateExpense(data) {
    setBtnTxt("Updating");
    setSpinner(true);
    const response = updateExpense(token, data, state.id);
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          navigate("/expenses");
        } else {
          console.log(data);
          toast.error("Internal server error");
        }
      })
      .finally(() => {
        setBtnTxt("Update");
        setSpinner(false);
      });
  }

  return (
    <div className="flex justify-center">
      <AuthCard title="Update Expense" cardClass="mt-3">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleUpdateExpense)}
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
