<template>
  <div class="form__container">
    <h3 class="form__title">{{ isEdit ? 'SỬA LỚP' : 'THÊM LỚP' }}</h3>
    <div class="form__content">
      <div class="form__group">
        <label class="form__label">Tên lớp*</label>
        <input
          v-model="classData.name"
          type="text"
          class="form__input"
          required
          placeholder="Nhập tên lớp"
        />
      </div>
      <div class="form__group">
        <label class="form__label">Thuộc</label>
        <select v-model="classData.parentId" class="form__select">
          <option :value="null">Tạo khối mới</option>
          <option v-for="cls in parentOptions" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
        </select>
      </div>
      <button @click="handleSubmit" class="btn btn-primary">Lưu</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useClassForm } from '@/composables/useClassForm'

export default {
  setup() {
    const route = useRoute()
    const { isEdit, classData, parentOptions, loadData, handleSubmit } = useClassForm(
      route.params.id,
    )

    onMounted(loadData)

    return { isEdit, classData, parentOptions, handleSubmit }
  },
}
</script>

<style lang="scss">
@import '@/sass/main.scss';
</style>
