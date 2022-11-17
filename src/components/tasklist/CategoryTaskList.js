import React,{useState} from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import TaskList from './TaskList'

import { IoMdAddCircleOutline } from "react-icons/io";

import '../../styles/TaskList.css';


function CategoryTaskList({tasks = [], onCheck = f => f, onOptionsModal = f => f}) {
    return (
    <>
        <List sx={{ width: '95%',left:'50%', transform: 'translateX(-50%)', bgcolor: '#FFE2E9', borderRadius:'5px', paddingLeft:'1vw', paddingRight: '1vw', marginTop:'1vh' }}>
            <div id='category_top'>
                <span id="category_name">{tasks[0].category}</span>
                <IconButton id='add_task_btn' aria-label="addTask" onClick={onOptionsModal}>
                    <IoMdAddCircleOutline size='3vh' />
                </IconButton>
            </div>
            <TaskList
                tasks={tasks}
                limit={tasks.length}
                onCheckTask={onCheck}
                onOptionsModal={onOptionsModal}/>
        </List>
    </>
    )
}

export default CategoryTaskList;