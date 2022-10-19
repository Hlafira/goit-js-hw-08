const saveToStorage = (key, value) => {
  try {
    const serialiseValue = JSON.stringify(value);
    localStorage.setItem(key, serialiseValue);
  } catch (error) {
    console.log('MyStorage save ', error);
  }
};

const loadFromStorage = key => {
  try {
    const serialiseValue = localStorage.getItem(key);
    return serialiseValue === null ? undefined : JSON.parse(serialiseValue);
  } catch (error) {
    console.log('loadfromStorage ', key, error);
  }
};

export default { saveToStorage, loadFromStorage };
