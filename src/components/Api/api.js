const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38138945-239ee90dc614073476176d6fe";


export const request = (searchText, page) => {
   return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchText}&page=${page}&per_page=12&safesearch=true&orientation=horizontal&image_type=photo`)
}

