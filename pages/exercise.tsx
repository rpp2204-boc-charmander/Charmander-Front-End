import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import ExerciseList from "../components/exercise/ExerciseList"
import CalorieComponent from "../components/exercise/CalorieComponent";
import SearchModal from "../components/exercise/SearchModal";
import EditModal from "../components/exercise/EditModal";
import CompletedModal from '../components/exercise/CompletedModal';
import Header from "../components/overview/Header";
import Modal from "../components/overview/Modal";

import styles from '../styles/Exercise.module.css';
import { MdOutlineFitnessCenter } from 'react-icons/md';

import mockData from '../mocks/exercisedata.json';

const getCaloriesBurned = (exercises: any): number => {
  let total = 0;

  exercises.forEach( (exercise: any) => {
    total += exercise.total_calories_burned;
  })

  return total;
}


export default function Exercise() {
  //Date
  const [ currentDate, setCurrentDate ] = useState(new Date());

  //IDs
  const [ workoutID, setWorkoutID ] = useState(1);

  //Exercises
  const [ exercises, setExercises ] = useState([]);

  //Modals
  const [ addModalState, setAddModalState ] = useState(false);
  const [ editModalState, setEditModalState ] = useState(false);
  const [ completedModalState, setCompletedModalState ] = useState(false);

  //Calories
  const [ caloriesBurned, setCaloriesBurned ] = useState(0)

  useEffect(() => {
    getUserExercises();
  }, [])

  const getUserExercises = () => {
    //get username and log_date from index im assuming
    axios.get('api/exercise/list', { params: { username: 'daMountain', log_date: '2022-12-13' } })
      .then(({ data }) => {
        setExercises(data);
      })
      .catch(error => {
        console.log(error.stack)
      })
  }

  const toggleAddModal = () => {
    setAddModalState( prevState => !prevState)
  }

  const toggleEditModal = (workout_id: number) => {
    setEditModalState( prevState => !prevState)

    if (workout_id) {
      setWorkoutID(workout_id)
    }
  }

  const toggleCompletedModal = () => {
    setCompletedModalState( prevState => !prevState)
  }

  const deleteExercise = (id: number) => {
    //alerts for now, will work on functionality later

    alert('Are you sure you want to remove this exercise?')
  };

  return (
    <>
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} title='Exercise' Icon={MdOutlineFitnessCenter}/>

      { addModalState && <SearchModal toggleAddModal={toggleAddModal}/>}
      { editModalState && <EditModal toggleEditModal={toggleEditModal} workoutID={workoutID}/>}
      { completedModalState && <CompletedModal toggleCompletedModal={toggleCompletedModal}/>}

      <div className="grid grid-cols-[25%_75%]">
        <CalorieComponent caloriesBurned={caloriesBurned} toggleAddModal={toggleAddModal}/>
        <ExerciseList exercises={exercises} toggleEditModal={toggleEditModal} deleteExercise={deleteExercise}  toggleCompletedModal={toggleCompletedModal}/>
      </div>
    </>
  )
}