const WebStorage = {
  set: (items, { permanent = false }) => {
    Object.entries(items).forEach(([key, value]) => {
      window.sessionStorage.setItem(key, value);
      if (permanent)
        window.localStorage.setItem(key, value);
    });
  },
  get: key => {
    return window.sessionStorage.getItem(key) ||
      window.localStorage.getItem(key);
  },
  remove: key => {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  }
};

export default WebStorage;
