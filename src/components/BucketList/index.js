import React,{useState,useEffect} from 'react'
import API from '../../utils/API'
import BucketItem from '../BucketItem'

export default function BucketList(props) {
    const [newItem, setNewItem] = useState("")
    const [newItemPriority, setNewItemPriority] = useState("med")
    const [tasks, setTasks] = useState([
       
    ])
    useEffect(()=>{
        API.getUserTodos(props.userId).then(data=>{
            setTasks(data.Todos)
        })
    },[])

    const handleFormSubmit = e=>{
        e.preventDefault();
        const newTask = {
            task:newItem,
            priority:newItemPriority,
            isComplete:false
        }
        setNewItem("")
        setNewItemPriority("med")
       API.createTodo(newTask,props.token).then(data=>{
        API.getUserTodos(props.userId).then(data=>{
            setTasks(data.Todos)
        })
       })
    }
    const completeTask = idx=>{
        const arrCopy = [...tasks];
        arrCopy[idx].isComplete = !arrCopy[idx].isComplete
        setTasks(arrCopy)
    }
    const deleteTask = idx=>{
        const arrCopy = [...tasks];
        arrCopy.splice(idx,1)
        setTasks(arrCopy)
    }
    const editTask = (idx,newTask)=>{
        const arrCopy = [...tasks];
        arrCopy[idx]=newTask
        setTasks(arrCopy)
    }
  return (
    <div className="BucketList">
        <form onSubmit={handleFormSubmit}>
            <input name="newItem" placeholder="new item!" value={newItem} onChange={e=>setNewItem(e.target.value)}/>
            <select value={newItemPriority} onChange={e=>setNewItemPriority(e.target.value)}>
                <option value="low">Low Priority</option>
                <option value="med">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <button>Add to list!</button>
        </form>
        <ul>
            {tasks.map((item,i)=><BucketItem 
            key={i} 
            index={i} 
            task={item.task} 
            priority={item.priority} 
            completeTask={completeTask} 
            deleteTask={deleteTask} 
            editTask={editTask} 
            isComplete={item.isComplete}/>)}
        </ul>
    </div>
  )
}
