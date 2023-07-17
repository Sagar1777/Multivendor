
import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {backend_url, server } from "../../server";
import { DataGrid } from '@material-ui/data-grid';

import { Button } from "@material-ui/core";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../styles/styles";

const ProfileContent = ({active}) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateUserInformation(name, email, phoneNumber, password));
  // };
  // const handleImage = async (e) => {
  //   const file = e.target.files[0];
  //   setAvatar(file);

  //   const formData = new FormData();

  //   formData.append("image", e.target.files[0]);

  //   await axios
  //     .put(`${server}/user/update-avatar`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //        dispatch(loadUser());
  //        toast.success("avatar updated successfully!");
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };
  return (
    <div className="w-full">
        {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  // onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form  aria-required={true}>
            <div className="w-full 800px:flex block pb-3">
  <div className="w-[100%] 800px:w-[50%]">
    <label className="block pb-2">Full Name</label>
    <input
      type="text"
      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="w-[100%] 800px:w-[50%]">
    <label className="block pb-2">Email Address</label>
    <input
      type="text"
      className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
</div>

<div className="w-full 800px:flex block pb-3">
  <div className="w-[100%] 800px:w-[50%]">
    <label className="block pb-2">Phone Number</label>
    <input
      type="number"
      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
      required
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
    />
  </div>
  <div className="w-[100%] 800px:w-[50%]">
    <label className="block pb-2">Enter your password</label>
    <input
      type="password"
      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
</div>

<div className="w-full pb-2">
  <div className="flex flex-wrap">
    <div className="w-full sm:w-1/2 sm:pr-2">
      <label className="block pb-2">Zip Code</label>
      <input
        type="number"
        className={`${styles.input}`}
        required
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
    </div>
    <div className="w-full sm:w-1/2 sm:pl-2">
      <label className="block pb-2">Address 1</label>
      <input
        type="address"
        className={`${styles.input}`}
        required
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
      />
    </div>
  </div>
</div>

<div className="w-full pb-2">
  <div className="flex flex-wrap">
    <div className="w-full sm:w-1/2 sm:pr-2">
      <label className="block pb-2">Address 2</label>
      <input
        type="address"
        className={`${styles.input}`}
        required
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
      />
    </div>
    {/* <div className="w-full sm:w-1/2 sm:pl-2">
      <label className="block pb-2">Address Type</label>
      <select
        name=""
        id=""
        value={addressType}
        onChange={(e) => setAddressType(e.target.value)}
        className="w-[95%] border h-[40px] rounded-[5px]"
      >
        <option value="" className="block border pb-2">
          Choose your Address Type
        </option>
        {addressTypeData &&
          addressTypeData.map((item) => (
            <option
              className="block pb-2"
              key={item.name}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
      </select>
    </div> */}
  </div>
</div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

  {/* order */}
  {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

{/* Refund */}
{active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

{/* Track order */}
{active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <PaymentOption />
        </div>
      )}
        {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}

    </div>
  )
}

const AllOrders = () => {
  const orders = [
    {
      _id: "741253258485",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "Rs " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return(
    <div className="pl-8 pt-1">
     <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "741253258485",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "Rs " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return(
    <div className="pl-8 pt-1">
     <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "741253258485",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "Rs " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return(
    <div className="pl-8 pt-1">
     <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
};

const PaymentOption = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className= {`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>

<br/>
<div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
  <div className="flex items-center">
    <img src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" style={{ width: '50px', height: '70px' }} />

    <h5 className="pl-5 font-[600]">Sagar Poudel</h5>
  </div>
  <div className="pl-8 flex items-center">
  <h6 className="mr-6">12** *** *** ***</h6>
  <h5>08/2023</h5>
</div>

  <div className="min-w-[10%] flex items-center justify-between pl-8">
    <AiOutlineDelete size={25} className="cursor-pointer" />
  </div>
</div>


    </div>
  );
};

const Address = () => {
  
  
return(
  <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
         My Address
        </h1>
        <div className= {`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>

<br/>
<div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
  <div className="flex items-center">
    <h5 className="pl-5 font-[600]">Default</h5>
  </div>
  <div className="pl-8 flex items-center">
  <h6 className="mr-6">Bharatpur-17, Rampur</h6>
</div>
<div className="pl-8 flex items-center">
  <h6 className="mr-6">885 872 154</h6>
</div>



  <div className="min-w-[10%] flex items-center justify-between pl-8">
    <AiOutlineDelete size={25} className="cursor-pointer" />
  </div>
</div>


    </div>
);
};


export default ProfileContent;