<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr><th>#</th><th>Lớp</th><th>Thao tác</th></tr>
      </thead>
      <tbody>
        <tr v-for="(cls, index) in classes" :key="cls.id">
          <td>{{ index + 1 + offset }}</td>
          <td>{{ cls.displayName }}</td>
          <td class="action-column">
            <router-link :to="`/edit-class/${cls.id}`" class="action-link edit">Sửa</router-link>
            <a href="#" @click.prevent="$emit('delete', cls.id)" class="action-link delete">Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['classes', 'offset'],
  emits: ['delete']
}
</script>
