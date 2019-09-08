import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://ec2-13-229-233-175.ap-southeast-1.compute.amazonaws.com',
  // baseURL: 'http://localhost:3000',
});
