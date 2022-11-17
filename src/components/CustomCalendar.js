import Calendar from 'react-calendar'; // npm install react-calendar
import '../styles/calendar.css'; // css import // test\node_modules\react-calendar\dist\Calendar.css
// import 'react-calendar/dist/Calendar.css'; // css import // test\node_modules\react-calendar\dist\Calendar.css
import React, { useState } from 'react';
import moment from 'moment'; // npm install moment --save

const Customdot = (date, uncheckedTasksNum) => {
  if(uncheckedTasksNum==0){
    return(<div key={moment(date).format("YYYY-MM-DD")} className="dot" style={{backgroundColor:"#FF9AB5"}}><span></span></div> );
  }
  else{
    return (<div key={moment(date).format("YYYY-MM-DD")} className="dot" style={{backgroundColor:"#C5C4F9"}}><span>{uncheckedTasksNum}</span></div> );
  }
}

const CustomCalendar = ({tasks = []}) => {
    const [value, onChange] = useState(new Date());
    const [mark, setMark] = useState([]);

    React.useMemo(
      ()=>{
        setMark(tasks.map(({date})=>date).reduce( // 일정 있는 날짜들
          (distinct, date) =>
            (distinct.indexOf(date) !== -1) ?
            distinct : [...distinct, date],
            []
        ))
      },[tasks]
    )

    return (
      <div className="calendar" style={{padding:"2px"}}>
        <header style={{textAlign:"left", backgroundColor:"#DFDFDF", minWidth:"300px", width:"30vw", padding:"0.5em 0em",borderRadius:"10px 10px 0px 0px"}}><span style={{fontWeight:"600", paddingLeft:"1em", color:"#555555", fontSize:"1.5em"}}>Calendar</span></header>
        <div style={{minWidth:"300px", width: "30vw", height: "70vh", backgroundColor:"#F0F0F0", borderRadius:"0px 0px 10px 10px"}}>
          <Calendar
            onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
            value={value}
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            navigationLabel={null}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            className="mx-auto w-full text-sm border-b"
            tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
              // 추가할 html 태그를 변수 초기화
              let html = [];
              // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
              if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                const uncheckedTasksNum = tasks.filter((task)=>task.date==moment(date).format("YYYY-MM-DD") && task.check==false).length
                html.push(Customdot(date,uncheckedTasksNum));
              }
              // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
            }}
          />
        </div>
      </div>

    );
}

export default CustomCalendar;