import localforage from "localforage";

const storage = localforage.createInstance({
  name: "bassera",
  storeName: "users",
  description: "bassera app storage"
});

export default storage;
