<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr><th>#</th><th>Họ và tên</th><th>Tuổi</th><th>Lớp</th><th>Thao tác</th></tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td>{{ index + 1 + offset }}</td>
          <td>{{ student.name }}</td>
          <td>{{ calculateAge(student.dob) }}</td>
          <td>{{ student.class }}</td>
          <td class="action-column">
            <a href="#" @click.prevent="editStudent(student)" class="action-link edit">Sửa</a>
            <a href="#" @click.prevent="$emit('delete', student.id)" class="action-link delete">Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['students', 'offset', 'calculateAge'],
  emits: ['delete'],
  methods: {
    editStudent(student) {
      localStorage.setItem('editingStudent', JSON.stringify(student))
      this.$router.push(`/edit-student/${student.id}`)
    }
  }
}
</script>
