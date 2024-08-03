
# Computer Based Test (CBT) System

## Project Description
The Computer Based Test (CBT) system is a comprehensive platform designed for higher institutions to manage and administer computer-based exams. The system features resource management for courses, exam questions, students, and staff/examiners. It comprises three main components:

1. **Admin Dashboard**: Manages courses, staff, and students, including creating, updating, deleting, and binding examiners to courses. It also allows for uploading published questions to the exam portal and viewing student results.

2. **Examiner Dashboard**: Enables examiners (staff members created by the admin) to create and publish exam questions for their respective courses. Examiners can also view student results for their courses.

3. **Exam Portal**: The interface where students take their tests. It includes student data, question pagination, question and options display, navigation components, a countdown timer, and logout/submit options.

## Installation Instructions

### Prerequisites
- Node.js
- MongoDB

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   Create a `.env` file in the root directory and set the following variables:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

## Usage

1. **Admin Dashboard:** Access at `/login/admin`. Use admin credentials to log in and manage resources.
2. **Examiner Dashboard:** Access at `/login/examiner`. Use examiner credentials to log in and manage exam questions.
3. **Exam Portal:** Access at `/`. Students log in to take their exams.

## Configuration
- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for JWT authentication.

## Contributing
Contributions are welcome! Updates are still being added from time to time. Please submit a pull request or open an issue for suggestions and improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors and Acknowledgments
Developed by Gideon Abbey[lightpc90]

## Contact Information
For inquiries, please contact: gideonabbey.tech, github.com/lightpc90.

## FAQ
**Q1: How can I reset a student's password as an Admin?**  
A: Students are to login with their matric number and surname(lastname); matric number as username, lastname as password.
**Q2: How can I create my account as a student?**  
A: This feature is restricted to admin. Admin creates students account by either fetching it from an existing source via API or manually creating it
**Q3: How can I create my account as a staff/examiner?**  
A: This feature is restricted to admin. Admin creates staffs account, using staff official email and generate an OTP for the email. the staff is then required to create a password with his email and the OTP generated


## Troubleshooting
**Q: The application isn't connecting to the database.**  
A: Ensure that the `MONGO_URI` in your `.env` file is correctly set to your MongoDB instance.