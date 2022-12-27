import styles from "../../styles/Exercise.module.css"
import { useState } from "react"
import axios from 'axios'

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { GiMuscleUp } from "react-icons/gi";


export default function ExerciseItem ({ exercise, toggleEditModal, deleteExercise, toggleCompletedModal, toggleAddSetModal, getExerciseSets, getUserExercises, setExercises} : any) {
  const [ confirm, setConfirm ] = useState(false);

  const completeExercise = async (workout_exercise_id: number) => {
    //get sets for exercise
    try {
      const { data: sets } = await getExerciseSets(workout_exercise_id);

      if (!sets.length) {
       console.log('No Sets ):')
       setConfirm(true);
       return;
      }

      for (var i = 0; i < sets.length; i++) {
        if (!sets[i].reps_actual) {
          setConfirm(true);
          return;
        }
      }

      await axios.put('api/exercise/workout', null, { params: { workout_exercise_id }});
      const { data: newWorkout } = await getUserExercises();

      setExercises(newWorkout);
      setConfirm(false)
    } catch (error: any) {
      console.log(error.stack);
    }
  }


  return (
    <div className="h-[35.3%] rounded-lg shadow-lg bg-gray-200 x-5 mt-8 flex flex-col">

      <header className="flex bg-gray-400 text-white justify-between items-center font-bold rounded-t-lg">

        <div className="flex items-center py-3 justify-around w-[45%]">
          <h1 className="text-2xl text-left pl-5 w-full">{exercise.exercise}</h1>
          <p className="font-bold">{exercise.muscle_group}</p>
        </div>

        <div className="flex mr-3">
          <AiOutlineEdit size={25} className="cursor-pointer" onClick={ () => { toggleEditModal(exercise.id) }}/>
          <AiOutlineDelete size={25} className="ml-2 cursor-pointer" onClick={ () => { deleteExercise(exercise.id) }}/>
        </div>

      </header>

      <section className="grid grid-cols-[25%_40%_35%] h-[250px]">

        <img className="bg-slate-50 w-[215px] place-self-center aspect-square rounded-lg shadow-md" alt="exercise-image" src={exercise.photo_url}></img>


        <div className="p-2 h-[250px]">

            <div className="bg-gray-500 flex flex-col rounded-2xl h-full overflow-y-scroll no-scrollbar border-2 shadow-[inset_0_2px_8px_0_#404040]">

            {exercise.sets?.map( (exercise: any) => {
              return <button className={`bg-slate-50 hover:bg-slate-300 w-[95%] rounded-2xl py-3 text-center shadow-md mx-2 my-2 font-bold ${exercise.reps_actual && 'bg-green-500 hover:bg-green-600 text-white'}`}
              onClick={ () => { toggleCompletedModal(exercise.set_id) }}
              key={exercise.set_id}
              > {exercise.reps} Reps | {exercise.weight_lbs} lbs | Actual: {exercise.reps_actual} </button>
            })}

            </div>

        </div>

        <div className="flex flex-col items-center justify-around h-[250px] px-2 relative">

          <p className="font-bold justify-self-center"> Estimated Calories Burned: {exercise.est_cals_burned}</p>

          <div className="flex flex-col w-full h-[45%] justify-evenly">

          { confirm && <p className="absolute text-red-500 top-[35%] left-[32%]"> Incomplete Sets</p> }

          { !exercise.is_complete &&
            <button className="bg-slate-50 hover:bg-slate-300 px-5 py-2 w-full rounded-full shadow-lg self-center font-bold" onClick={ () => {toggleAddSetModal(exercise.id)}}> Add Set </button>
          }

          { exercise.is_complete ?
            <p className='bg-green-500 shadow-lg rounded-full w-full h-[40%] font-bold text-slate-50 flex justify-center items-center'> Exercise Completed </p> :
            <button className="bg-blue-500 hover:bg-blue-600 shadow-lg rounded-full w-full h-[40%] font-bold text-slate-50"
                  onClick={ () => { completeExercise(exercise.id) }}> Complete Exercise
            </button>}

          </div>
        </div>




      </section>
    </div>
  )
};