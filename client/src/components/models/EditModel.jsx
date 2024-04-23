import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast from "react-hot-toast";

export const EditModel = ({ data, button }) => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState({
    foodname: data.foodname,
    email: "",
    phonenumber: null,
    quantity: data.quantity,
    address: "",
    mealType: data.mealType,
    categoryType: data.categoryType,
    district: data.district,
    _id: data._id,
  });

  const handleChange = (e) => {
    const formData = { ...edit };
    formData[e.target.name] = e.target.value;
    setEdit(formData);
  };
  const handleOpen = () => setOpen(!open);

  const updateDonation = async (id, updatedData) => {
    if (!edit.phonenumber || !edit.email || !edit.address) {
      alert("Please fill all the fields");
    }

    if (!/^\d{10}$/.test(edit.phonenumber)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(edit.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`/api/auth/updatedonation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
      }

      if (data.success) {
        toast.success("Donation updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating donation:", error.message);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className=" text-white">
        {button}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          <div className="w-full flex flex-col">
            <form
              action=""
              className="w-[95%] max-w-[300px] mx-auto flex flex-col"
            >
              <div className="flex flex-col">
                <label htmlFor="" className="text-2xl font-bold text-black">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="rounded-[5px] h-[40px] mt-2 ps-2"
                  placeholder={data.email}
                  onChange={handleChange}
                  style={{ border: "2px solid black" }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-2xl font-bold text-black">
                  Phone
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  className="rounded-[5px] h-[40px] mt-2 ps-2"
                  placeholder={data.phonenumber}
                  onChange={handleChange}
                  style={{ border: "2px solid black" }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-2xl font-bold text-black">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="rounded-[5px] h-[40px] mt-2 ps-2"
                  placeholder={data.address}
                  onChange={handleChange}
                  style={{ border: "2px solid black" }}
                />
              </div>
              <div className="w-full flex justify-between items-center my-3">
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => {
                    updateDonation(data._id, edit);
                    handleOpen();
                  }}
                >
                  <span>Edit</span>
                </Button>
              </div>
            </form>
          </div>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            updateDonation(data._id,edit);
            handleOpen()
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};
