import MyResponsivePie from '../components/Chart'
//import data from '../components/data'
import { Outlet, Link } from "react-router-dom";
import '../App.css';
import '../styles/grid.css';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Profile from "./Profile";
import StyledListItem from '../styles/linkStyle';
import { VscHome } from 'react-icons/vsc' //GiStairsGoal
import { GiStairsGoal } from 'react-icons/gi' //GiStairsGoal, IoPersonOutline
import { IoPersonOutline } from 'react-icons/io5' //GiStairsGoal, IoPersonOutline,BsPeople
import { BsPeople } from 'react-icons/bs' //GiStairsGoal, IoPersonOutline,BsPeople
import { useLocation } from 'react-router-dom';
import getPieData from '../components/getPieData';
import getProgressData from '../components/getProgressData';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, } from 'recharts'
import Slider from '../components/Slider'
import Button from '@material-ui/core/Button';
import '../styles/linkButton.css';
const Goal = () => {
    const location = useLocation();
    const { tasks, teams, teamTask } = location.state;



    //const numOftasks = tasks;
    //console.log(numOftasks)
    //const { id, date } = tasks;

    //console.log(numTrue)
    //console.log("This is home and Tasks are transfered", tasks)
    //const [numTasks, numTrue] = 
    const Piedata = getPieData(tasks);
    console.log("Piedata in Goal : ", Piedata);
    //category별 진척도

    const categoryFilter = (keyWord) => keyWord.map(task => { return task.category });
    //const dateFilter = (keyWord) => keyWord.map(task => { return task.date });

    const categories = categoryFilter(tasks)

    const uniqueArr = (array) => array.filter((element, index) => {
        return array.indexOf(element) === index;
    });
    const uniqueCategories = uniqueArr(categories);
    //console.log("uniqueCategories", uniqueCategories)
    const progressData = uniqueCategories.map((category, i) => {
        return getProgressData(tasks, category)
    })
    const uniqueProgressData = uniqueArr(progressData);

    console.log("progressData", uniqueProgressData);



    return (
        <div id="app" className="parent" >
            <div className="box menu" >
                <nav className="seo_nav">
                    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.black', position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <List component="nav">
                                <nav>
                                    <StyledListItem >
                                        <Button className="linkButton" component={Link} to="/" state={{ tasks: tasks, teams:teams, teamTask:teamTask }}>
                                            <VscHome /><ListItemText className="menuName"> Home</ListItemText>
                                        </Button>
                                    </StyledListItem>
                                </nav>
                                <nav >
                                    <StyledListItem>
                                        <Button className="linkButton" component={Link} to="/Goal" state={{ tasks: tasks, teams:teams, teamTask:teamTask }}>
                                            <GiStairsGoal /><ListItemText className="menuName"> Goal</ListItemText>
                                        </Button>
                                    </StyledListItem>
                                </nav>
                                <nav>
                                    <StyledListItem>
                                        <Button className="linkButton" component={Link} to="/MyTask" state={{ tasks: tasks, teams:teams, teamTask:teamTask }}>
                                            <IoPersonOutline /><ListItemText className="menuName"> My Task</ListItemText>
                                        </Button>
                                    </StyledListItem>
                                </nav>
                                <nav>
                                    <StyledListItem>
                                        <Button className="linkButton" component={Link} to="/TeamLink" state={{ tasks: tasks, teams:teams, teamTask:teamTask }}>
                                            <BsPeople /><ListItemText className="menuName"> Team</ListItemText>
                                        </Button>
                                    </StyledListItem>
                                </nav>
                        </List>
                    </Box>
                </nav >
            </div >
            <div className="box profile"><Profile /></div>
            <div className="box content"  >
                <div style={{ width: '100%', height: '100%', }}>
                    <Slider Piedata={Piedata} />
                </div>
            </div>
            <div className="box follower"></div>
            <div className="box tasklist">

                <ResponsiveContainer width='90%' aspect={4.0 / 2.0}>
                    <BarChart data={uniqueProgressData} layout="vertical" fill="#000000" width={150} height={40}>
                        <XAxis type="number" dataKey="total" hide />
                        <YAxis dataKey="name" reversed type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar legendType="category" dataKey="done" fill="#FF9AB5" />
                    </BarChart>
                </ResponsiveContainer>
                {/* <MyBarCharts data={uniqueProgressData} /> */}
            </div>
            <div className="box teamlist">

            </div>
        </div >


    );
};

export default Goal;



