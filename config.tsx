import axios from 'axios';

 export const BASE_URL = "http://192.168.1.5:1337"; // local_url
// export const BASE_URL = "https://www.act21.io/server";
//export const BASE_URL = "https://act21.cloudstalwarts.com/server/"

 export const getFooterData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/header-footer/?populate=deep`);
    return response.data;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};
 export const getDropDowns = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/custom/?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};
