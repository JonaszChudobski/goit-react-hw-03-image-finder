import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const handleFetch = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=37378265-e99df069f710b566c70c02ed7&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
