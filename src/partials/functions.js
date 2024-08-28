import axios from 'axios';

const KEY = '45639968-4ab0c3e34d3afa9a12b28af2f';
const ENDPOINT = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });


 export const fetchData = async ({params,perPage,page})=>{
  try {
    const {data} = await axios.get(`${ENDPOINT}?key=${KEY}&q=${params}&${searchParams}&per_page=${perPage}&page=${page}`)
    return data
} catch (error) {
    return error
}
}

