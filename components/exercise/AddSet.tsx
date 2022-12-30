import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";

import axios from "axios";

export default function AddSet({ toggleAddSetModal, workoutID }: any) {
  const [ confirm, setConfirm ] = useState(false);
  const [ setNumber , setSetNumber ] = useState(0);

  const weightRef: any = useRef([]);
  const repsRef: any = useRef([]);

  const onSubmit = () => {

    let reps = repsRef.current.map( (rep: any) => {
      return Number(rep?.value);
    })

    let weights = weightRef.current.map( (weight: any) => {
      return Number(weight?.value);
    })

    if (reps[0] && weights[0]) {
      axios.post('api/exercise/create/set', {
          weights,
          reps,
          workout_exercise_id: workoutID
        })
        .then(() => {
          toggleAddSetModal();
          console.log('Successfully Added Set')
        })
        .catch((error) => {
          toggleAddSetModal();
          console.log(error.stack)
        })
    } else {
      setConfirm(true);
    }
  }

  return (
    <div>

      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={toggleAddSetModal}></div>


      <div
        className="fixed top-[50%] left-[50%] z-50 flex h-[45%] w-[40%] translate-x-[-50%]
      translate-y-[-50%] flex-col items-center rounded-3xl bg-gray-300 pl-10 pr-10 text-black">

        <div className="header flex w-[100%] flex-row items-center justify-between pt-4 pb-4">
          <div className="title text-[2rem] font-bold"> Add Set </div>
          <MdClose
            className="cursor-pointer text-[2rem]"
            onClick={toggleAddSetModal}
          />
        </div>

        <div className="bg-gray-500 flex flex-col rounded-2xl h-[60%] w-full justify-around items-center overflow-y-scroll no-scrollbar shadow-well">

          <div className="bg-slate-100 flex flex-col h-5/6 w-11/12 py-3 rounded-2xl shadow-lg justify-evenly items-center relative">

          { confirm && <p className="absolute text-red-500 top-0 text-sm"> Please Set Reps and Weight </p> }

          { setNumber < 1 &&
            <>
              <select name="sets" onChange={ (e) => { setSetNumber(Number(e.target.value)) }} className="bg-slate-50 rounded-lg p-5 w-[70%] shadow-xl text-center font-bold">
                <option selected={true}> Choose Number of Sets</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </>
          }

          { setNumber > 0 && Array(setNumber).fill(1).map( (x, i) => {
            return (
            <div key={i} className="flex justify-evenly w-[80%]">
              <div className="flex">
                  <h3 className="w-20 text-center font-bold"> Reps </h3>
                  <input
                    className="rounded-lg shadow-md bg-slate-50 w-[100px]"
                    type="number"
                    ref={(e) => { repsRef.current[i] = e }}
                  ></input>
                </div>

              <div className="flex">
                <h3 className="w-20 text-center font-bold"> Weight </h3>
                <input
                  className="rounded-lg shadow-md bg-slate-50 w-[100px]"
                  type="number"
                  ref={(e) => { weightRef.current[i] = e }}
                ></input>
                <span className="ml-3"> lbs </span>
              </div>
            </div>
            )
          })}

          </div>

         </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-full
                             w-full px-10 py-4 font-bold mt-4 shadow-md"
                onClick={onSubmit}
                disabled={ setNumber === 0 ? true : false}> Add </button>

      </div>

    </div>
  );
}
