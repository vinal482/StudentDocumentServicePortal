import { FunctionComponent, useCallback } from "react";
import StudentIDFrame from "../components/StudentIDFrame";
import SemesterMarksFrame from "../components/SemesterMarksFrame";
import "../App.css";

const StudentDocsFrame: FunctionComponent = () => {
  const navigate = useNavigate();

//   const onStatusTextClick = useCallback(() => {
//     navigate("/6");
//   }, [navigate]);

  return (
    <div className="student-docs-frame">
      <StudentIDFrame/>
      <SemesterMarksFrame />
    </div>
  );
};

export default StudentDocsFrame;
