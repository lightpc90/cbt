import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    middlename: {
      type: String,
    },
    lastname: {
        type: String,
      },
    phone: {
      type: String,
    },
    staffID: {
        type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error('Invalid Email');
          }
      },
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course'
    },
    tempPwd: {
      type: String,
    },
    createdPwd: {
      type: Boolean,
      default: false,
    },
    hashedPwd: {
      type: String,
    },
    username: {
      type: String,
    },
    birthdayMonth: {
      type: String,
    },
    image: {
      type: String,
    },
    birthDay: {
      type: Number,
    },
    dept: {
      type: String,
    },
    gender: {
      type: String,
    },
    residentialAddress: {
      type: String,
    },
    title: {
      type: String,
    },

    admin: {
      type: Boolean,
      default: false,
    },
    superUser: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);



const Staff = mongoose.models["Staff"] || mongoose.model("Staff", StaffSchema);

export default Staff;
