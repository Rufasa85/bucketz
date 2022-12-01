import React,{useState} from 'react'
import "./style.css"

export default function BucketItem(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState(props.task)
    const [editItemPriority, seteditItemPriority] = useState(props.priority)
    const handleFormSubmit = e=>{
        e.preventDefault();
        const newItem={
            task:editItem,
            priority:editItemPriority,
            isComplete:props.isComplete
        }
        props.editTask(props.index,newItem)
        setIsEditing(false)
    }
  return (
    <>
   {isEditing?(
   <form onSubmit={handleFormSubmit}>
     <input name="editItem"  value={editItem} onChange={e=>setEditItem(e.target.value)}/>
            <select value={editItemPriority} onChange={e=>seteditItemPriority(e.target.value)}>
                <option value="low">Low Priority</option>
                <option value="med">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <button>Update</button>
   </form>
   ):(
   <li className={`BucketItem ${props.priority} ${props.isComplete?"complete":""}`}>
        task: {props.task}<br/>  priority: {props.priority} <br/>
        <button onClick={()=>props.deleteTask(props.index)}>Delete</button>
        <button onClick={()=>setIsEditing(true)}>Edit</button>
        <button onClick={()=>props.completeTask(props.index)}>{props.isComplete?"restart task":"complete task"}</button>
    </li>
    )
    }
    </>
  )
  
}
