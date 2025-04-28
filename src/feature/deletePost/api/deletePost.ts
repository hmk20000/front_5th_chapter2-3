// 게시물 삭제
const deletePost = async (id: string) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('게시물 삭제 오류:', error);
  }
};

export default deletePost;
