import clsx from 'clsx';
import { memo } from 'react'
import TaskModalSlice from '../../../redux/slices/Modals/TaskModalslice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
function TaskChild({ type }: { type: "in progress" | "need review" | "done" }) {
    const location = useLocation()
    const dispatch = useDispatch<any>()
    return (<>
        <div onClick={() => {
            if (location.pathname.includes("/tasks") || location.pathname.includes("/overview"))
                dispatch(TaskModalSlice.actions.handleOpen({}))
        }} className="cursor-pointer hover:bg-gray-200 w-full h-fit p-2 rounded-xl bg-[#F5F5F5] flex justify-around items-center">
            <span className="font-semibold capitalize text-sm max-w-[40]">TaskName: clean up DHBKTPHCM</span>
            <span className="text-sm font-semibold">Type: <span className="text-sm font-normal">Janitor</span></span>
            <span className="text-sm font-semibold">Started: <span className="text-sm font-normal"> 10pm 25/2/2023</span></span>
            {
                type === "need review" ?
                    <span className="text-sm font-semibold">Trigger: <span className="text-sm font-normal"> 10pm 25/2/2023</span></span>
                    :
                    type === "done" ?
                        <span className="text-sm font-semibold">End: <span className="text-sm font-normal"> 10pm 25/2/2023</span></span>
                        :
                        <></>
            }
            <div className={clsx("ml-2 p-2 min-w-20 h-fit rounded-xl text-white text-sm font-semibold capitailize flex justify-center items-center", {
                "bg-green-400": type === "in progress",
                "bg-yellow-400": type === "need review",
                "bg-blue-400": type === "done"
            })}>{
                    type === "in progress" ? "in progress" : type === "need review" ? "Need review" : "Done"
                }</div>
        </div>
    </>);
}

export default memo(TaskChild);