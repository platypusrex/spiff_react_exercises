import React from "react";
import Exercise from "../exercise/Exercise";
import { ParserSolution } from '../solutions/ParserSolution';

const ParserExercise = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<ParserSolution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/2"
        title="Parser Exercise"
      />
    </div>
  );
};

export default ParserExercise;
