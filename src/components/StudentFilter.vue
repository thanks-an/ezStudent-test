<template>
  <div class="filter-section">
    <div class="filter-controls">
      <select v-model="selectedClass" class="form-select" @change="$emit('filter')">
        <option value="">Tất cả các lớp</option>
        <option v-for="cls in classOptions" :key="cls.value" :value="cls.value">{{ cls.label }}</option>
      </select>
      <button @click="$emit('filter')" class="btn btn-outline">Tìm kiếm</button>
    </div>
    <router-link to="/create-student">
      <button class="btn btn-primary">Thêm học sinh</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['classOptions', 'modelValue'],
  emits: ['update:modelValue', 'filter'],
  computed: {
    selectedClass: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) }
    }
  }
}
</script>
