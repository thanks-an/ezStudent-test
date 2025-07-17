import { saveClass } from '../services/ClassService.js'
import { v4 as uuidv4 } from 'uuid'

export function seedData() {
  const existingClasses = localStorage.getItem('classes')
  if (existingClasses && JSON.parse(existingClasses).length > 0) return

  const lop10Id = uuidv4(), lop11Id = uuidv4(), lop12Id = uuidv4()

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

  sampleClasses.forEach(cls => saveClass(cls))

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
    { id: uuidv4(), name: 'Ngô Thị Lan', dob: '2008-10-08', class: 'Lớp 10B' },
    { id: uuidv4(), name: 'Đỗ Văn Minh', dob: '2007-01-12', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Lương Thị Nga', dob: '2007-02-25', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Phan Văn Oánh', dob: '2007-03-18', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Trịnh Thị Phúc', dob: '2007-04-22', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Võ Văn Quang', dob: '2007-05-30', class: 'Lớp 11A' },
    { id: uuidv4(), name: 'Đinh Thị Rau', dob: '2007-06-14', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Chu Văn Sơn', dob: '2007-07-19', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Mã Thị Tâm', dob: '2007-08-25', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Kiều Văn Út', dob: '2007-09-12', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Hồ Thị Vân', dob: '2007-10-05', class: 'Lớp 11B' },
    { id: uuidv4(), name: 'Dương Văn Xuân', dob: '2006-01-20', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Tạ Thị Yến', dob: '2006-02-15', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Mai Văn Zin', dob: '2006-03-28', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Lý Thị Ánh', dob: '2006-04-10', class: 'Lớp 12A' },
    { id: uuidv4(), name: 'Từ Văn Bảo', dob: '2006-05-22', class: 'Lớp 12A' }]; localStorage.setItem('students', JSON.stringify(sampleStudents))
}
