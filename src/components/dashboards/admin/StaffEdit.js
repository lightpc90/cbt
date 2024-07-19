"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiDeleteBinFill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/appContext/appState";

import StaffForm from "./StaffForm";

const StaffEdit = ({ staff, isEditing, setIsEditing }) => {
  const { setStaffs } = useAppContext();

  const [openDeletBox, setOpenDeleteBox] = useState(false);

  const [deleteInfo, setDeleteInfo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDeleteInfo = () => {
    return staff.staffID === deleteInfo;
  };

  const handleStaffDelete = async () => {
    console.log("check ", staff.staffID === deleteInfo);
    console.log("entering delete function");
    if (confirmDeleteInfo() === false) {
      console.log("wron input");
      console.log("delete info: ", deleteInfo, "and matric: ", staff.staffID);
      toast.error("incorrect input");
      return;
    }
    try {
      console.log("entering the delete api...");
      setIsDeleting(true);
      const res = await fetch("/api/staff/deleteAStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: staff._id }),
      });
      const isDeleted = await res.json();
      if (isDeleted.success === false) {
        toast.error(isDeleted.error);
      } else {
        setStaffs((prevStaffs) =>
          prevStaffs.filter((existingStaff) => existingStaff._id !== staff._id)
        );
        toast.success(isDeleted.message);
      }
    } catch (err) {
      console.group("Internal Server Error in student delete route: ", err);
      toast.error("Internal Server Error: try again!");
    } finally {
      setIsDeleting(false);
      //   re-route
    }
  };

  return (
    <div className="max-w-[450px] max-h-[900px] bg-slate-900 py-12 px-5 overflow-auto">
      <p className="text-center font-bold text-2xl mb-5">
        Update Staff Information
      </p>
      <StaffForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        staff={staff}
      />
      <div className="flex items-center gap-2 mt-5">
        <button
          onClick={() => setIsEditing(false)}
          className="bg-rose-800 px-2 py-1 rounded-md hover:border-2 hover:border-white"
        >
          Cancel
        </button>
      </div>
      <div className="mt-10">
        {!openDeletBox && (
          <button
            className="flex items-center gap-2 text-rose-800 font-semibold"
            onClick={() => setOpenDeleteBox(true)}
          >
            Delete Staff Info <RiDeleteBinFill size={20} />
          </button>
        )}
        {openDeletBox && (
          <div>
            <label>
              <p>
                NB: This action will delete the staff entire data. To continue,
                type the staff ID, {staff.staffID} in the box below
              </p>
              <input
                name="deleteInfo"
                value={deleteInfo}
                onChange={(e) => setDeleteInfo(e.target.value)}
                type="text"
                className="text-slate-800 px-2 p-1 rounded-md"
              />
            </label>
            <div className="space-x-2 mt-3">
              <button
                onClick={handleStaffDelete}
                className="bg-rose-900 py-1 px-2 hover:bg-rose-700"
              >
                {isDeleting ? `Deleting...` : `Delete Staff`}
              </button>
              <button
                className="border border-rose-900 py-1 px-2 hover:bg-rose-700"
                onClick={() => setOpenDeleteBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffEdit;
