import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import { Fragment } from "react";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <Fragment key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </Fragment>
        );
      })}
    </>
  );
};

export default Course;
