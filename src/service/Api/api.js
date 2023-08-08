import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38138945-239ee90dc614073476176d6fe";

async function request (searchText, page, prePage) {
   return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchText}&page=${page}&per_page=${prePage}&safesearch=true&orientation=horizontal&image_type=photo`)
}

export default request