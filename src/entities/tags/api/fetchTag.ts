const fetchTag = async () => {
  const response = await fetch('/api/posts/tags');
  return response.json();
};

export default fetchTag;
