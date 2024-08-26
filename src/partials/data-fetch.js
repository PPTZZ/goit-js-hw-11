import axios from 'axios';

const KEY = '45639968-4ab0c3e34d3afa9a12b28af2f';
const ENDPOINT = 'https://pixabay.com/api/';


 export const fetchData = async (params)=>{
  try {
    const {data} = await axios.get(`${ENDPOINT}?key=${KEY}&q=${params}&per_page=30`)
    console.log(data)
} catch (error) {
    return console.error(error)
}
}