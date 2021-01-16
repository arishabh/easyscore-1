import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchResults, setCourses } from "../../actions";
import { useParams } from "react-router-dom";

import { filterToKeyword } from "./hooks/";

import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import NoResults from "./components/NoResults";
import Loading from "../../components/Loading";
import ResultsNumber from "../../components/ResultsNumber";
import Nav from "../../navbar/Nav";

import SearchForm from "../home/components/SearchForm";

import FiltersCard from "./components/filters/FiltersCard";

import "./results.css";

const Results = (props) => {
  const [keyword, setKeyword] = useState("");
  const params = useParams();

  console.log("yello!");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("params axiosurl: ", params.axiosUrl);
    dispatch(fetchResults(params.axiosUrl));
    // dispatch(setCourses(props.courses));
    filterToKeyword(params.axiosUrl, setKeyword);
  }, []);

  return (
    <div className="page-container">
      {/* <SecondaryNav /> */}
      <Nav />
      <main className="page-container">
        <SearchForm />
        {/* <Header keyword={keyword} courses={props.displayedCourses} header={0} /> */}
        <div className="results-container">
          {/*************** BEGIN RENDERING RESULTS *********************/}
          {/* LOADING */}
          {props.isLoading === true ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div>
              <div className="filtersCard-courses-container">
                <FiltersCard />
                {/********* END NUMBER, RENDER CARDS ********/}
                <div>
                  <div>
                    <ResultsNumber
                      number={props.displayedCourses.length}
                      results={"courses"}
                      header={1}
                      keyword={keyword}
                    />
                  </div>
                  <div className="courseDisplayContainer">
                    {props.displayedCourses.length > 0 ? (
                      [
                        props.displayedCourses.map((course) => {
                          return (
                            <CourseCard course={course} key={course.url} />
                          );
                        }),
                      ]
                    ) : (
                      //********  RENDER NO RESULTS IF NO RESULTS  *******/
                      <NoResults />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    courses: state.courses,
    displayedCourses: state.displayedCourses,
    errorText: state.errorText,
  };
};

export default connect(mapStateToProps, { fetchResults, setCourses })(Results);
