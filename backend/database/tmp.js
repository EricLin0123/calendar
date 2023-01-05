tasks =
  //this model is used to store tasks & events
  //if startHour==-1,it is a all-day task/event.
  [
    {
      type: "task", //or event
      name: "WP Project",
      allday: false,
      startTime: new Date(), //a date object, may not in the form of this
      endTime: null, //or a date object
      tags: ["WP", "HW", "Important"],
    },
  ];
tags =
  //this model is used to store tags
  [
    {
      group: "Subject",
      instances: ["WP", "ALG"], //1 tags from each group
    },
    {
      group: "type",
      instances: ["HW", "exam", "report"],
    },
    {
      group: "others",
      instances: ["Important"],
    },
  ];
user =
  //this model is used to store users
  [
    {
      name: "Joachim",
      email: "lllion66666@gmail.com",
      tasks: [
        /*objectIDs of something in "tasks" model*/
      ],
    },
  ];
