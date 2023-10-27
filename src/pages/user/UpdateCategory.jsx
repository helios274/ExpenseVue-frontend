import React, { useState } from "react";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCategory } from "../../api/categories";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedCategory, setUpdatedCategory] = useState(state.name);

  const handleUpdateCategory = () => {
    if (state.name !== updatedCategory.trim()) {
      const response = updateCategory(token, { name: updatedCategory }, id);
      response
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.success(data.message);
            navigate(-1);
          } else toast.error("Error occurred while updating category");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <div className="flex md:w-[330px] shadow-md">
        <input
          type="text"
          className="py-3 px-3 outline-none border-none focus:outline-none focus:border-none flex-grow sm:w-[205px] max-[450px]:py-2 max-[450px]:text-sm"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
        />
        <Button
          onClick={handleUpdateCategory}
          children="Update"
          className="ml-auto w-[70px] font-medium max-[450px]:text-sm bg-tertiary text-primary hover:bg-quaternary hover:text-primary"
        />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex justify-center md:w-[330px] py-3 shadow-md font-medium bg-secondary mt-3 hover:bg-secondary/90"
      >
        Go Back
      </button>
    </div>
  );
};

export default UpdateCategory;
