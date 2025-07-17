const CLASS_KEY = 'classes';

function notifyClassChange() {
  window.dispatchEvent(new CustomEvent('classListChanged'));
}

export function getClasses() {
  const data = localStorage.getItem(CLASS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getClassById(id) {
  return getClasses().find(cls => cls.id === id);
}

export function saveClass(newClass) {
  const classes = getClasses();
  classes.push(newClass);
  localStorage.setItem(CLASS_KEY, JSON.stringify(classes));
  notifyClassChange();
}

export function updateClass(updatedClass) {
  const classes = getClasses().map(cls =>
    cls.id === updatedClass.id ? updatedClass : cls
  );
  localStorage.setItem(CLASS_KEY, JSON.stringify(classes));
  notifyClassChange();
}

export function deleteClass(id) {
  const classes = getClasses().filter(cls => cls.id !== id);
  localStorage.setItem(CLASS_KEY, JSON.stringify(classes));
  notifyClassChange();
}
