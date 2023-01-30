import axios from "axios";
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Key': '8d1e40c423msh420fa9072a27a93p1d3461jsn18543d3d4470',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

export const getPlaceData = async(sw, ne) => {
    try {
        const response = await axios.get(URL,  {
            params: {
            bl_latitude:sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': '8d1e40c423msh420fa9072a27a93p1d3461jsn18543d3d4470',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }})
        const {data: { data }} = response
        // console.log(data);
        return data
    } catch (error) {
        console.log(error.response);
    }
}