const getLineChartData = (tasks) => {
    const getWeekNumber = (dateFrom = new Date()) => {
        // 해당 날짜 (일)
        const backup = dateFrom.getFullYear() + "-" + ('0' + (dateFrom.getMonth() + 1)).slice(-2) + "-" + ('0' + dateFrom.getDate()).slice(-2);

        const currentDate = dateFrom.getDate();

        // 이번 달 1일로 지정
        const startOfMonth = new Date(dateFrom.setDate(1));

        // 이번 달 1일이 무슨 요일인지 확인
        const weekDay = startOfMonth.getDay(); // 0: Sun ~ 6: Sat

        // ((요일 - 1) + 해당 날짜) / 7일로 나누기 = N 주차
        return `${backup.slice(0, 10)} : ${(parseInt(((weekDay - 1) + currentDate) / 7) + 1)}주차`;
    }

    // console.log(getWeekNumber(new Date())); // 2022-11-20 기준, 4
    // console.log(getWeekNumber(new Date('2022-10-31'))); // 6
    const dateFilter = (keyWord) => keyWord.map(task => { return task.date });
    const dates = dateFilter(tasks);

    const months = dates.map(date => date.slice(0, 7));
    // console.log("dates in getLineChartData", dates)
    const weeks = dates.map(date => {
        return getWeekNumber(new Date(date));
    });//몇주차인지
    // console.log(weeks)
    const result = weeks.reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
    }, []);
    const count = weeks.map(week => week + " " + result[week.slice(0, 16)]);

    console.log(count)

    // console.log("#####################################")
    // result.map(week =>
    //     console.log("weekDate :  ", week)
    // )
    // console.log(result)
    // console.log("#####################################")

    // console.log(result);
    // console.log("in getLineChartData months", months);

    const uniqueArr = (array) => array.filter((element, index) => {
        return array.indexOf(element) === index;
    });
    const uniqueCount = uniqueArr(count);
    console.log(uniqueCount)
    // console.log(uniqueMonths);
    const uniqueMonths = uniqueArr(months);

    const weekdata = uniqueCount.map(nWeek => {
        let mweek = nWeek.slice(13, 14);
        let mmonth = nWeek.slice(0, 7);
        let numTasks = 0;

        const mtasks = tasks.map(task => {
            return (task.date.slice(0, 7) == mmonth) && (mweek == getWeekNumber(new Date(task.date)).slice(13, 14))
                ? numTasks++ : numTasks;
        })


        // console.log(mmonth)
        let numTrue = 0;
        const a = tasks.map(task => {
            return (((task.date.slice(0, 7) == mmonth) && (mweek == getWeekNumber(new Date(task.date)).slice(13, 14))) && (task.check === true))
                ? numTrue++ : numTrue;
        })
        // console.log("month ", mmonth);
        // console.log("week", mweek)
        // console.log("numTasks in week", numTasks);
        // console.log("numTrue in getLineChartData", numTrue);

        //console.log(mtasks)

        return { mmonth, mweek, numTasks, numTrue };
    })
    // console.log(weekdata)

    // let uniqueArr2 = (weekdata) => weekdata.filter((element, index) => {
    //     return (
    //         //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
    //         weekdata.findIndex(
    //             (item) => item[0] === element[0] && item[1] === element[1]
    //         ) === index
    //     );
    // });
    const arrUnique = (weekdata) => weekdata.filter((character, idx, arr) => {
        return arr.findIndex((item) => item.mmonth === character.mmonth && item.mweek === character.mweek) === idx
    });

    const uniqueWeekdata = arrUnique(weekdata);

    // console.log(uniqueWeekdata)


    const groupByCategory = (uniqueWeekdata) => uniqueWeekdata.reduce((group, weekdata) => {
        const { mmonth } = weekdata;
        // console.log("weekdata", weekdata);
        group[mmonth] = group[mmonth] ?? [];
        group[mmonth].push(weekdata);
        return group;
    }, []);



    const sortedUniqueWeekData = groupByCategory(uniqueWeekdata)

    const sortedUniqueMonths = uniqueMonths.sort(function (a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        if (a < b) return -1;
    });
    const MarrUnique = (weekdata) => weekdata.filter((character, idx, arr) => {
        return arr.findIndex((item) => item.x === character.x && item.y === character.y) === idx
    });

    const LINEDATA = sortedUniqueMonths.map(
        month => {
            var arrlinedata = [];

            var arrlabels = ['1주차', '2주차', '3주차', '4주차'];
            var finalLineData = [];
            const compare = [
                { x: "1주차", y: `0` },
                { x: "2주차", y: `0` },
                { x: "3주차", y: `0` },
                { x: "4주차", y: `0` },
            ];

            sortedUniqueWeekData[month].map(
                (monthly) => {
                    //console.log("monthly", monthly)

                    const labels = monthly.mweek + "주차"
                    // const labels = monthly.mmonth + "월" + monthly.mweek + "주차"
                    arrlabels.push(labels)
                    // const linedata = { x: monthly.mmonth + "월" + monthly.mweek + "주차", y: `${monthly.numTrue / monthly.numTasks * 100}` }
                    const linedata = { x: monthly.mweek + "주차", y: `${monthly.numTrue / monthly.numTasks * 100}` }
                    arrlinedata.push(linedata)
                    return;
                }
            )

            // "linedata => n주차 m% 
            compare.map(compare => {
                finalLineData.push(compare)
                arrlinedata.map(linedata => {
                    if (finalLineData.includes(compare) && compare.x == linedata.x && parseFloat(compare.y) <= parseFloat(linedata.y)) {
                        finalLineData.pop()
                        finalLineData.push(linedata)
                    }

                    return;
                })
            })
            for (let i = 0; i < arrlinedata.length; i++) {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                if (!finalLineData.findIndex(i => i.x == arrlinedata.x)) {
                    finalLineData.push(arrlinedata[i]);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                }
            }

            const sortedlabels = arrlabels.sort(function (a, b) {
                return a.slice(0, 1) - b.slice(0, 1);
            });
            const sortedlinedata = arrlinedata.sort(function (a, b) {
                return a.x.slice(0, 1) - b.x.slice(0, 1);
            });
            const finalLabelData = uniqueArr(sortedlabels)
            //const FinalLineData = arrUnique(finalLineData)

            console.log("#####################")
            console.log(finalLineData)
            console.log("#####################")



            return {
                labels: finalLabelData,
                datasets: [
                    {
                        type: 'line',
                        label: '주차별 목표달성율',
                        borderColor: '#FF9AB5',
                        borderWidth: 2,
                        data: finalLineData,
                        datalabels: {		// 라인차트의 CSS
                            // color: 'white'
                            color: '#FF9AB5',
                            backgroundColor: 'white',
                            font: { size: 13, weight: 'bold' },
                        },

                    },
                ]
            };
        }

    )


    return LINEDATA;


}

export default getLineChartData

