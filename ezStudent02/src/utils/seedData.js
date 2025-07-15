
import { saveClass } from '../services/ClassService.js'
import { v4 as uuidv4 } from 'uuid'

export function seedData() {

  const existingClasses = localStorage.getItem('classes')
  if (existingClasses && JSON.parse(existingClasses).length > 0) {
    return
  }


  const lop10Id = uuidv4()
  const lop11Id = uuidv4()
  const lop12Id = uuidv4()

  const sampleClasses = [

    { id: lop10Id, name: 'Lớp 10', parentId: null },
    { id: uuidv4(), name: 'Lớp 10A', parentId: lop10Id },
    { id: uuidv4(), name: 'Lớp 10B', parentId: lop10Id },
    { id: uuidv4(), name: 'Lớp 10C', parentId: lop10Id },


    { id: lop11Id, name: 'Lớp 11', parentId: null },
    { id: uuidv4(), name: 'Lớp 11A', parentId: lop11Id },
    { id: uuidv4(), name: 'Lớp 11B', parentId: lop11Id },
    { id: uuidv4(), name: 'Lớp 11C', parentId: lop11Id },


    { id: lop12Id, name: 'Lớp 12', parentId: null },
    { id: uuidv4(), name: 'Lớp 12A', parentId: lop12Id },
    { id: uuidv4(), name: 'Lớp 12B', parentId: lop12Id },
    { id: uuidv4(), name: 'Lớp 12C', parentId: lop12Id },
  ]


  sampleClasses.forEach(cls => {
    saveClass(cls)
  })


  const sampleStudents = [

    { id: uuidv4(), name: 'Nguyễn Văn An', dob: '2008-01-15', class: 'Lớp 10A' },
    { id: uuidv4(), name: 'Trần Thị Bình', dob: '2008-02-20', class: 'Lớp 10A' },
    { id: uuidv4(), name: 'Lê Văn Cường', dob: '2008-03-10', class: 'Lớp 10A' },
    { id: uuidv4(), name: 'Phạm Thị Dung', dob: '2008-04-05', class: 'Lớp 10A' },
    { id: uuidv4(), name: 'Hoàng Văn Em', dob: '2008-05-12', class: 'Lớp 10A' },


    { id: uuidv4(), name: 'Vũ Thị Phương', dob: '2008-06-18', class: 'Lớp 10B' },
    { id: uuidv4(), name: 'Đặng Văn Giang', dob: '2008-07-22', class: 'Lớp 10B' },
    { id: uuidv4(), name: 'Bùi Thị Hoa', dob: '2008-08-15', class: 'Lớp 10B' },
    { id: uuidv4(), name: 'Cao Văn Khoa', dob: '2008-09-30', class: 'Lớp 10B' },


    { id: uuidv4(), name: 'Đỗ An', dob: '2007-01-15', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Nguyễn Thị Lan', dob: '2007-02-10', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Trần Văn Minh', dob: '2007-03-25', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Lê Thị Nga', dob: '2007-04-30', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Phạm Văn Oanh', dob: '2007-05-15', class: 'Lớp 11A' },


    { id: uuidv4(), name: 'Hoàng Thị Phúc', dob: '2007-06-20', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Vũ Văn Quân', dob: '2007-07-10', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Đặng Thị Rồng', dob: '2007-08-05', class: 'Lớp 11B' },


    { id: uuidv4(), name: 'Nguyễn Ngọc', dob: '2006-03-20', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Trần Văn Sơn', dob: '2006-01-10', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Lê Thị Tuyết', dob: '2006-02-15', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Phạm Văn Uy', dob: '2006-04-25', class: 'Lớp 12A' },


    { id: uuidv4(), name: 'Hoàng Thị Vân', dob: '2006-05-30', class: 'Lớp 12B' },
    { id: uuidv4(), name: 'Vũ Văn Xanh', dob: '2006-06-12', class: 'Lớp 12B' },
    { id: uuidv4(), name: 'Đặng Thị Yến', dob: '2006-07-18', class: 'Lớp 12B' },
  ]

  localStorage.setItem('students', JSON.stringify(sampleStudents))
}
