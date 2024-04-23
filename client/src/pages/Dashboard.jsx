import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Header } from "../components/Header/Header";
import { EditModel } from "../components/models/EditModel";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";




import { Model2 } from "../components/models/Model2";

import toast from "react-hot-toast";

const TABLE_HEAD = [
  "Food Name",
  "Email",
  "Phone",
  "Quantity",
  "Meal Type",
  "Category",
  "Address",
  "District",
  "Delete",
  "Edit",
];

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const [id, setId] = useState("");
  const [allDonations, setAllDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]); // State to store filtered donations
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const fetchAllDonations = async () => {
    try {
      const response = await fetch(`/api/auth/getdonations`);
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        setAllDonations(data.data);
        setFilteredDonations(data.data); // Initialize filteredDonations with all donations
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllDonations();
  }, []);



// // Function to handle search and date filtering
// const handleSearch = () => {
//   // Filter donations based on date range
//   const filtered = allDonations.filter(item => {
//     const createdAtDate = new Date(item.createdAt); // Extract the date from createdAt

//     // Check if the donation date is within the specified date range
//     return (!fromDate || createdAtDate >= new Date(fromDate)) && (!toDate || createdAtDate <= new Date(toDate));
//   });

//   setFilteredDonations(filtered); // Update filteredDonations state with filtered data
// };

const filterDataByDate = () => {
  return allDonations.filter((item) => {
    const firstAiredDate = new Date(item.updatedAt);
    const selectedStartDate = new Date(fromDate);
    const selectedEndDate = new Date(toDate);

    return firstAiredDate >= selectedStartDate && firstAiredDate <= selectedEndDate;
  });
};

const filteredDataByDate = fromDate && toDate ? filterDataByDate() : allDonations;
const filteredData = filteredDataByDate.filter(item => {
  const email = item.email.toLowerCase();

  return email.includes(searchTerm.toLowerCase());
});



  const handleDelete = async (id) => {
    alert("Do You want to delete?");
    try {
      const response = await fetch(`/api/auth/deletedonation/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("donation deleted");
        fetchAllDonations();
      }
      if (!response.ok) {
        toast.error("Failed to delete donation");
      }
    } catch (error) {
      console.error("Error deleting donation:", error.message);
    }
  };
  console.log(filteredDonations)
  return (
    <section>
      <Header />
      <div className="w-full flex items-center justify-between">
        <div className="text-3xl md:text-5xl font-bold text-[#006d21] py-4 ps-4">
          Donations
        </div>
      
      </div>
      <div className="w-full flex justify-around sm:justify-between items-center flex-wrap">
        <div className="flex items-center">
          <div className="flex flex-col m-3">
            <label htmlFor="from" className="form-label font-bold text-black" >From</label>
            <input 
            type="date" 
            className="rounded-[5px]" 
            style={{ border: "2px solid black" }} 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)} 
          />
          </div>
          <div className="flex flex-col m-3">
            <label htmlFor="to" className="form-label font-bold  text-black">To</label>
            <input 
              type="date" 
              className="rounded-[5px]" 
              style={{ border: "2px solid black" }} 
              value={toDate} 
              onChange={(e) => setToDate(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex items-center me-[30px]">
          <FaSearch className="me-[-20px] pointer-events-none z-[1]  text-black " />
          <input
            type="text"
            placeholder="Search..."
            className="ps-[20px] w-[120px] md:w-[200px] h-[30px] rounded-[5px] border-[2px]"
            style={{
              border: "2px solid black",
            }}
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)} // Call handleSearch function on input change
          />
        </div>
      </div>

      <Card className="h-full w-[97%] md:w-[95%] mt-[40px] mx-auto overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-black text-white">
            <tr className="bg-[black] text-white">
              <th className="border-b border-blue-gray-100 text-white p-4">
                <Typography
                  variant="small"
                  color="white"
                  className=" leading-none text-white text-[17px] font-bold opacity-70"
                >
                  S.no
                </Typography>
              </th>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 text-white p-4"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className=" leading-none text-white text-[17px] font-bold opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {filteredData.map((item, index) => {
              const isLast = index === filteredDonations.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.foodname}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.phonenumber}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.mealType}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.categoryType}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.district}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Button
                      color="red"
                      variant="outlined"
                      onClick={() => handleDelete(item._id)}
                    >
                      <RiDeleteBin6Line className="text-2xl" />
                    </Button>
                  </td>
                  <td className={classes}>
                      <EditModel
                        data={item}
                        button={<RiEdit2Fill className="text-lg" />}
                      />
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </Card>
      {filteredData.length === 0 && (
              <div>
                <div colSpan={TABLE_HEAD.length} className="p-4 text-center text-3xl text-black">
                  No  Donations found.
                </div>
              </div>
            )}
    </section>
  );
};

export default Dashboard;
