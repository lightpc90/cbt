"use client";

import React, { useState } from "react";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";
import { ICourse, IStaff } from "@/components/interfaces/interfaces";

const Titles = [
  { value: "", name: "Choose Title" },
  { value: "Mr.", name: "Mr." },
  { value: "Ms.", name: "Ms." },
  { value: "Mrs.", name: "Mrs." },
  { value: "Engr.", name: "Engr." },
  { value: "Dr.", name: "Dr." },
  { value: "Prof.", name: "Prof." },
];

const Genders = [
  { value: "", name: "Select Gender" },
  { value: "Female", name: "Male" },
  { value: "Female", name: "Female" },
];

type StaffFormUpdateProps={staff?:IStaff; isEditing?: boolean; setIsEditing?:(arg:boolean)=>boolean}

  type FormDataType = {
    title: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    dept: string;
    gender: string;
    staffID: string;
    courseCodes?: string[];
  };
  const initialFormData = {
    title: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    dept: "",
    staffID: "",
    gender: "",
    courseCodes: [],
  };
 

const StaffForm = ({ staff, isEditing, setIsEditing }: StaffFormUpdateProps) => {
  const { state, dispatch } = useAppContext();

 const updateInitialFormData = {
   title: staff?.title,
   firstname: staff?.firstname,
   middlename: staff?.middlename,
   lastname: staff?.lastname,
   email: staff?.email,
   dept: staff?.dept,
   gender: staff?.gender,
   staffID: staff?.staffID,
 };
  const [formData, setFormData] = useState<FormDataType>(
    isEditing ? updateInitialFormData : initialFormData
  );

  // loading state
  const [updating, setUpdating] = useState(false);
  const [registering, setRegistering] = useState(false);

  let tempPwd: string;

  // temp pasword generating funtion
  const genTempPassword = (data:FormDataType) => {
    // function to randomly pick a letter from a name
    function pickRandomLetter(name: string) {
      // Check if the name is not empty
      if (name.length === 0) {
        console.log("name is empty");
        return "01";
      }
      // Generate a random index within the range of the string length
      const randomIndex = Math.floor(Math.random() * name.length);
      // Return the letter at the random index
      return name[randomIndex];
    }
    // generate random numbers
    function generateSixDigits() {
      // Generate a random number between 100000 (inclusive) and 999999 (inclusive)
      const randomNumber =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      return randomNumber;
    }

    const tempPassword = `${pickRandomLetter(data.firstname)}${pickRandomLetter(
      data.lastname
    )}-${generateSixDigits()}`;
    console.log("generated password: ", tempPassword);
    tempPwd = tempPassword;
  };

  // function to register lecturer
  const handleStaffRegistration = async () => {
    // run a validation function here!

    //
    setRegistering(true);

    // function to generate temporary password
    genTempPassword(formData);

    // call course creation API
    const res = await fetch("/api/staff/createAStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, tempPwd: tempPwd }),
    });
    if (!res.ok) {
      toast.error("failed to make api call");
      setRegistering(false);
      return;
    }
    const _res = await res.json();
    if (_res?.error) {
      console.log("error: ", _res.error);
      toast.error(_res.error);
    } else if (_res?.success) {
      console.log("message: ", _res.message);
      // add the new staff to the list of staffs in app state
      // setStaffsData([...staffsData, _res.data])
      dispatch({type: ActionCommand.ADD_STAFF, payload: _res.data})
      // setStaffs((prevData) => {
      //   return [...prevData, _res.data];
      // });
    }
    setFormData(initialFormData);
    setRegistering(false);
  };

  const bindCoursesToStaff = (course: ICourse) => {
    // if code is included in the staff already, remove it
    const existingCourses = formData.courseCodes;
    console.log("staff courses: ", existingCourses);
    if (existingCourses.includes(course.code)) {
      const indexToRemove = existingCourses.indexOf(course.code);
      if (indexToRemove !== -1) {
        existingCourses.splice(indexToRemove, 1);
      }
      // setStaffData({...staffData, courses: [existingCourses]})
      setFormData((prevData) => {
        return { ...prevData, courses: existingCourses };
      });
    } else {
      // setStaffData({...staffData, courses: [...existingCourses, course.code]})
      setFormData((prevData) => {
        return { ...prevData, courses: [...existingCourses, course.code] };
      });
    }
  };

  // const getUpdatedList = (prevList, updatedData) => {
  //   console.log("prevList: ", prevList, "and new studn: ", updatedData);
  //   const newList = prevList.map((eachStudent) =>
  //     eachStudent._id == updatedData._id ? updatedData : eachStudent
  //   );
  //   console.log("new list: ", newList);
  //   return newList;
  // };

  // Update function
  const handleStaffUpdate = async () => {
    if (
      !formData.firstname ||
      !formData.middlename ||
      !formData.lastname ||
      !formData.dept ||
      !formData.gender
    ) {
      console.log("formData: ", formData);
      toast.error("fill the form completely");
      return;
    }
    setUpdating(true);

    // call update api if form loaded in update component
    console.log("updatig staff");
    const update = await fetch("/api/staff/updateAStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: staff._id, update: formData }),
    });
    if (!update.ok) {
      toast.error("Internal Error");
      setUpdating(false);
      return;
    }

    const isUpdate = await update.json();
    if (isUpdate.success === false) {
      toast.error(isUpdate.error);
    } else {
      dispatch({type: ActionCommand.UPDATE_STAFFS, payload: isUpdate.data})
      // setStaffs((prev) => getUpdatedList(prev, isUpdate.data));
      toast.success(isUpdate.message);
    }
    setUpdating(false);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* title */}
      <label htmlFor="title" className="text-sm">
        Staff Title:
      </label>
      <select
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="bg-inherit border rounded-md p-2 "
      >
        {Titles.map((Title, i) => (
          <option key={i} value={Title.value} className="text-slate-900">
            {Title.name}
          </option>
        ))}
      </select>
      {/* firstname */}
      <label htmlFor="firstname" className="text-sm">
        First Name:
      </label>
      <input
        value={formData.firstname}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
        type="text"
        name="firstname"
        placeholder="John"
        required
        className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
      />
      {/* middlename */}
      <label htmlFor="middlename" className="text-sm">
        Middle Name:
      </label>
      <input
        value={formData.middlename}
        onChange={(e) =>
          setFormData({ ...formData, middlename: e.target.value })
        }
        type="text"
        name="middlename"
        placeholder="Miller"
        className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
      />
      {/* lastname */}
      <label htmlFor="lastname" className="text-sm">
        Last Name:
      </label>
      <input
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        type="text"
        name="lastname"
        placeholder="Doe"
        required
        className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
      />
      {/* email */}
      <label htmlFor="email" className="text-sm">
        Email:
      </label>
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        type="email"
        name="email"
        placeholder="staff@domain.com"
        required
        className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
      />
      {/* gender select input */}
      <label htmlFor="gender" className="text-sm">
        Staff Gender:
      </label>
      <select
        value={formData.gender}
        name="gender"
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
        className="bg-inherit border rounded-md p-2"
      >
        {Genders?.map((gender, i) => (
          <option key={i} value={gender.value} className="text-slate-900">
            {gender.name}
          </option>
        ))}
      </select>
      {/* dept select input */}
      <label htmlFor="dept" className="text-sm">
        Staff Department:
      </label>
      <select
        value={formData.dept}
        name="dept"
        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
        required
        className="bg-inherit border rounded-md p-2"
      >
        <option value="">Choose Dept</option>
        {state.courses?.map((course: ICourse, i: number) => (
          <option key={i} value={course.dept} className="text-slate-900">
            {course.dept}
          </option>
        ))}
      </select>
      <p className="text-slate-500">
        NOTE: dept must first be registered via Course Registration
      </p>
      {/* staff id */}
      <label htmlFor="dept" className="text-sm">
        Staff ID:
      </label>
      <input
        value={formData.staffID}
        onChange={(e) => setFormData({ ...formData, staffID: e.target.value })}
        type="text"
        name="staffID"
        placeholder="School Staff ID"
        required
        className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
      />
      {isEditing ? (
        // When Updating
        <button
          onClick={handleStaffUpdate}
          className="bg-green-800 px-2 py-1 rounded-md hover:border-2 hover:border-white"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      ) : (
        // When Registering
        <div>
          {/* courses button container */}
          <p className="text-sm">
            Bind Lecturer to his course(s) by choosing from the list of
            registered Courses below
          </p>
          <div className="flex flex-wrap gap-2 my-4">
            {/* map department here */}
            {state.courses?.map((course: ICourse, i: number) => (
              <button
                onClick={() => bindCoursesToStaff(course)}
                className={`ring-2 ring-blue-800 ${
                  formData.courseCodes.includes(course.code)
                    ? `bg-green-900 text-white`
                    : ``
                } p-1 text-sm rounded-md hover:bg-rose-800 hover:text-white`}
                key={i}
              >
                {course.code}
              </button>
            ))}
          </div>

          <button
            onClick={handleStaffRegistration}
            className="bg-rose-700 text-white rounded-md hover:bg-slate-800 px-2 py-1"
          >
            {registering ? `Registering...` : `Register Lecturer`}
          </button>
        </div>
      )}
    </div>
  );
};
export default StaffForm;
