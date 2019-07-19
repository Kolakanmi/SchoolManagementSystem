
var SidebarItemsArray = [
  { 
    id: 1,
    name: 'Dashboard',
    drops: ['Admin', 'Students', 'Parents', 'Teachers'],
    link: ['/dashboard', '/dashboard/student', '/dashboard/parent', '/dashboard/teacher']
  },
  {
    id: 2,
    name: 'Students',
    drops: ['All Students', 'Student Details', 'Admission Form', 'Promotion'],
    link: ['/students/all-students', '/students/student-details/', '/students/add-student', '/students/student-promotion']
  },
  { 
    id: 3,
    name: 'Teachers',
    drops: ['All Teachers', 'Teacher Details', 'Add teacher'],
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
    drops: ['All Books', 'Add Book'],
    link: ['/library/all-books', '/library/add-book']
  },
  { 
    id: 6,
    name: 'Finance',
    drops: ['Fees', 'Other Income', 'Create Student Payment', 'All Expenses', 'Add Expenses'],
    link: ['/finance/fees', '/finance/other-earnings', '/finance/create-fees-payment', '/finance/all-expenses', '/finance/add-expense']
  },
  { 
    id: 7,
    name: 'Class',
    drops: ['Add Class', 'All Classes'],
    link: ['/class/add-class', '/class/all-classes']
  },
  { 
    id: 8,
    name: 'Subject',
    link: ['/subjects/all-subjects']
  },
  { 
    id: 9,
    name: 'Class Routine',
    link: ['/']
  },
  { 
    id: 10,
    name: 'Attendance',
    link: ['/']
  },
  { 
    id: 11,
    name: 'Exam',
    drops: ['Exam Schedule', 'Exam Grades'],
    link: ['/', '/exams/grades']
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
    name: 'Message',
    link: ['/']
  },
  { 
    id: 16,
    name: 'Profile',
    link: ['/profile']
  }
];

export default SidebarItemsArray;