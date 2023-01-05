// const calTimeTable = (viewTime, viewTasks) => {
    //     var smallest = 26;
    //     var largest = -2;
    //     for(var i=0;i<viewTasks.length;i++){
    //         if(viewTime.year === viewTasks[i].startDate.getFullYear() && viewTime.month === viewTasks[i].startDate.getMonth()+1 && viewTime.date === viewTasks[i].startDate.getDate() && viewTasks[i].includeTime){
    //             if( smallest > viewTasks[i].startDate.getHours() ){
    //                 smallest = viewTasks[i].startDate.getHours();
    //             }
    //         }
    //         if(viewTasks[i].includeInterval && viewTime.year === viewTasks[i].endDate.getFullYear() && viewTime.month === viewTasks[i].endDate.getMonth()+1 && viewTime.date === viewTasks[i].endDate.getDate() && viewTasks[i].includeTime){
    //             if( largest < viewTasks[i].endDate.getHours() ){
    //                 largest = viewTasks[i].endDate.getHours();
    //             }
    //         }
    //     }
    //     if(smallest === 26 && largest === -2){
    //         console.log("nothing is time-related on this day")
    //         return [];
    //     }
    //     largest = largest + 1;
    //     if(smallest < 0) smallest = 0;
    //     if(largest > 24) largest = 24;
    //     var timeTable = [];
    //     for(var mid=smallest;mid<=largest;mid++){
    //         timeTable.push(mid);
    //     }
    //     return timeTable;
    // }
    // const timeTable = calTimeTable(viewTime, viewTasks);