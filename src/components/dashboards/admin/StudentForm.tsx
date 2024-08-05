"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import { IStudent } from "@/components/types/types";

const Depts = [
  "Computer Science",
  "Mathematics Education",
  "Biology Education",
  "Physics",
  "English",
];
const Genders = ["Male", "Female"];

type StudentFormType = {
  student?: IStudent;
  isEditing?: boolean;
  setIsEditing?: (arg: boolean) => boolean;
};

const StudentForm = ({ student, isEditing, setIsEditing }: StudentFormType) => {
  const { dispatch } = useAppContext();

  console.log("is editing? ", isEditing);

  const [loading, setIsLoading] = useState(false);

  const initialFormData = {
    firstname: "",
    middlename: "",
    lastname: "",
    matricNo: "",
    dept: "",
    gender: "",
    imageUrl: "",
  };

  const updatingInitialData = {
    firstname: student?.firstname,
    middlename: student?.middlename,
    lastname: student?.lastname,
    matricNo: student?.matricNo,
    dept: student?.dept,
    gender: student?.gender,
    imageUrl: student?.imageUrl,
  };

  const [formData, setFormData] = useState(
    isEditing === true ? updatingInitialData : initialFormData
  );
  const [file, setFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleImgChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  // save image to system files
  const handleImageSaving = async () => {
    setError("");
    if (!file) {
      return;
    }
    const imageData = new FormData();
    imageData.set("file", file);
    console.log("imageData: ", imageData);
    setUploadingImage(true);
    setFile(null);
    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: imageData,
      });
      if (!res.ok) {
        console.log("api failed...", await res.text());
        setUploadingImage(false);
        setError("api failed");
        return;
      }
      const data = await res.json();
      if (data.error) {
        console.log("error: ", data.error);
        setError(data.error);
      } else {
        toast.success(data.message);
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        console.log("the image url: ", data.url);
      }
    } catch (error) {
      console.log(error);
      setError("Internal Server Error");
    } finally {
      setUploadingImage(false);
    }
  };

  // useEffect(() => {
  //     if (file !== null) {
  //         handleImageSaving()
  //     }
  // }, [file])

  const getUpdatedList = (prevList, updatedStudent) => {
    console.log("prevList: ", prevList, "and new studn: ", updatedStudent);
    const newList = prevList.map((eachStudent) =>
      eachStudent._id == updatedStudent._id ? updatedStudent : eachStudent
    );
    console.log("new list: ", newList);
    return newList;
  };

  const handleRegisterOrUpdate = async () => {
    if (
      !formData.firstname ||
      !formData.middlename ||
      !formData.lastname ||
      !formData.matricNo ||
      !formData.dept ||
      !formData.gender
    ) {
      console.log("fill the form completely");
      return;
    }
    setIsLoading(true);

    // call update api if form loaded in update component
    if (isEditing === true) {
      console.log("updatig student");
      const update = await fetch("/api/student/updateAStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: student._id, update: formData }),
      });
      if (!update.ok) {
        toast.error("Internal Error");
        setIsLoading(false);
        return;
      }

      const isUpdate = await update.json();
      if (isUpdate.success === false) {
        toast.error(isUpdate.error);
      } else {
        dispatch({
          type: ActionCommand.UPDATE_STUDENTS,
          payload: isUpdate.data,
        });
        // setStudents((prev) => getUpdatedList(prev, isUpdate.data));
        toast.success(isUpdate.message);
      }
      setIsLoading(false);
      setIsEditing(false);
      return;
    }

    // call the api to register a new student
    console.log("registering a student");
    const res = await fetch("/api/auth/register/student/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log("Api failed");
      toast.error("Server Error");
      setIsLoading(false);
      return;
    }

    const result = await res.json();
    if (result.success === false) {
      console.log(result.error);
      toast.error(result.error);
    } else {
      dispatch({ type: ActionCommand.ADD_STUDENT, payload: result.data });
      // setStudents((prev) => [...prev, result.data]);
      toast.success(result.message);
      setFormData(initialFormData);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-[92%] w-full overflow-auto flex flex-col p-2">
      <div className="space-y-2">
        {/* student info inputs */}
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="First Name"
          className="py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500"
          value={formData.firstname}
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
        />
        <input
          type="text"
          name="middleName"
          id="middleName"
          required
          placeholder="Middle Name"
          className="py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500"
          value={formData.middlename}
          onChange={(e) => {
            setFormData({ ...formData, middlename: e.target.value });
          }}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          placeholder="Last Name"
          className="py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500"
          value={formData.lastname}
          onChange={(e) => {
            setFormData({ ...formData, lastname: e.target.value });
          }}
        />
        <input
          type="text"
          name="matricNo"
          id="matricNo"
          required
          placeholder="Matric No"
          className="py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500"
          value={formData.matricNo}
          onChange={(e) => {
            setFormData({ ...formData, matricNo: e.target.value });
          }}
        />
        <select
          className="block py-1 px-2 w-[80%] text-slate-900 rounded-md hover:bg-rose-500"
          value={formData.dept}
          onChange={(e) => {
            setFormData({ ...formData, dept: e.target.value });
          }}
        >
          <option value="">Select Department</option>
          {Depts.map((dept, i) => (
            <option value={dept} key={i}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="block text-slate-900 py-1 px-2 rounded-md hover:bg-rose-500"
          required
          value={formData.gender}
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
        >
          <option value="">Gender</option>
          {Genders.map((gender, i) => (
            <option value={gender} key={i}>
              {gender}
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          className="bg-slate-800  py-1 px-2 rounded-md hover:bg-slate-700"
          onClick={handleRegisterOrUpdate}
        >
          {isEditing === true && !loading
            ? `Update Student Info `
            : isEditing == true && loading
            ? `Updating...`
            : !isEditing && !loading
            ? `Register A New Student`
            : `Registering...`}
        </button>
        {isEditing === true && (
          <button
            className="bg-rose-900 hover:bg-rose-800 py-1 px-2 rounded-md ml-3"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
