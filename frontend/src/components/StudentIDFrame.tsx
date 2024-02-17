import { FunctionComponent } from "react";
import "../App.css";

export type StudentIDFrameType = {
  /** Action props */
  onStatusTextClick?: () => void;
};

const StudentIDFrame: FunctionComponent<StudentIDFrameType> = ({
  onStatusTextClick,
}) => {
  return (
    <header className="student-i-d-frame4">
      <div className="student-i-d-frame-child" />
      <h3 className="student-documents-service1">Student Documents Service</h3>
      <div className="parent-frame-parent">
        <div className="parent-frame1">
          <img
            className="curved-grid-41"
            loading="eager"
            alt=""
            src="/curved--grid4.svg"
          />
          <div className="status6" onClick={onStatusTextClick}>
            Status
          </div>
        </div>
        <div className="logout-text">
          <div className="logout2">Logout</div>
          <img
            className="outline-logout2"
            loading="eager"
            alt=""
            src="/outline--logout.svg"
          />
        </div>
      </div>
    </header>
  );
};

export default StudentIDFrame;
