<template>
  <div class="not-found-bt1">
    <div class="message-container">
      <h2>Chức năng không khả dụng</h2>
      <p>Chức năng quản lý lớp chỉ có trong bài tập 2.</p>
      <p>Bài tập 1 chỉ tập trung vào quản lý học sinh.</p>
      <router-link to="/students" class="btn-primary">
        Quay lại danh sách học sinh
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-bt1 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
}

.message-container {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.message-container h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.message-container p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.5;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>
