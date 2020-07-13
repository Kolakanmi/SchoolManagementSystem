
var SidebarItemsArray = [
  { 
    id: 1,
    name: 'Dashboard',
    link: ['/dashboard']
  },
  {
    id: 2,
    name: 'Students',
    drops: ['All Students', 'Admission Form'],
    link: ['/students/all-students', '/students/add-student']
  },
  { 
    id: 3,
    name: 'Teachers',
    drops: ['All Teachers', 'Teacher Details', 'Add Teacher'],
    link: ['/teachers/all-teachers', '/teachers/teacher-details', '/teachers/add-teacher']
  },
  { 
    id: 4,
    name: 'Parents',
    link: ['/parents']
  },
  { 
    id: 5,
    name: 'Library',
    link: ['/library/add-book']
  },
  { 
    id: 6,
    name: 'Finance',
    drops: ['Fees', 'Create Student Payment', 'Add Expense', 'All Expenses'],
    link: ['/finance/fees', '/finance/create-fees-payment', '/finance/add-expense', '/finance/all-expenses']
  },
  { 
    id: 7,
    name: 'Class',
    link: ['/class/add-class']
  },
  { 
    id: 8,
    name: 'Subject',
    link: ['/subjects/all-subjects']
  },
  { 
    id: 10,
    name: 'Attendance',
    link: ['/attendance']
  },
  { 
    id: 11,
    name: 'Exam Grades',
    link: ['/exams/grades']
  },
  { 
    id: 12,
    name: 'Transport',
    link: ['/transport']
  },
  { 
    id: 13,
    name: 'Hostel',
    link: ['/hostel']
  },
  { 
    id: 14,
    name: 'Notice',
    link: ['/notice']
  },
  { 
    id: 15,
    name: 'Profile',
    link: ['/profile']
  }
];

export default SidebarItemsArray;