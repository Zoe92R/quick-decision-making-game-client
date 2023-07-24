import axios from "axios";

axios.defaults.baseURL =
  window.location.protocol + "//" + window.location.hostname + ":3333";

export default axios;
