// Cấu hình ứng dụng cho từng bài tập
export const APP_CONFIG = {
  // Cấu hình mặc định (BT2) - đầy đủ chức năng
  BT2: {
    title: 'ezStudy - Bài tập 2',
    features: {
      classes: true, // Hiển thị menu Lớp
      students: true, // Hiển thị menu Học sinh
    },
    defaultRoute: '/students',
  },

  // Cấu hình BT1 - chỉ quản lý học sinh
  BT1: {
    title: 'ezStudy - Bài tập 1',
    features: {
      classes: false, // Ẩn menu Lớp
      students: true, // Chỉ hiển thị menu Học sinh
    },
    defaultRoute: '/students',
  },
}

// Config hiện tại sẽ được set khi khởi tạo app
export let currentConfig = APP_CONFIG.BT2

// Hàm để set config
export function setAppConfig(configKey) {
  if (APP_CONFIG[configKey]) {
    currentConfig = APP_CONFIG[configKey]
  }
}
