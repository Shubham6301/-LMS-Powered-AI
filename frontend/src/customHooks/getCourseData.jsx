import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../redux/courseSlice.js";
import { useEffect } from "react";
import React from "react";

const useGetCourseData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        if (!userData) return; // wait for userData

        const result = await axios.get(
          `${serverUrl}/api/course/getpublishedcourses`,
          { withCredentials: true }
        );

        // Remove duplicate courses based on _id
        const uniqueCourses = result.data.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c._id === course._id)
        );

        console.log("Fetched Courses:", uniqueCourses);

        // Overwrite courseData in Redux
        dispatch(setCourseData(uniqueCourses));
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      }
    };

    getAllPublishedCourse();
  }, [userData, dispatch]);
};

export default useGetCourseData;
