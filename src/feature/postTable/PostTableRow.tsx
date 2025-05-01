import { TableRow, TableCell } from '../../shared/ui/Table';
import { Post } from '../../entities/post/model/types';
import { User } from '../../entities/user/model/types';
import { PostWithUser } from '../postsWithUser/model/types';
import { Button } from '../../shared/ui/Button';
import { MessageSquare, ThumbsDown, ThumbsUp, Edit2 } from 'lucide-react';
import DeletePostButton from '../deletePost/ui/DeletePostButton';
import { useSelectedPostStore } from '../postDetail/model/store';
import { useFilter } from '../filter/hooks/useFilter';
interface PostTableRowProps {
  post: PostWithUser;
  searchQuery: string;
  openUserModal: (user: User) => void;
  openPostDetail: (post: Post) => void;
  setShowEditDialog: (show: boolean) => void;
}
const PostTableRow = ({
  post,
  searchQuery,
  openUserModal,
  openPostDetail,
  setShowEditDialog,
}: PostTableRowProps) => {
  const { setSelectedPost } = useSelectedPostStore();
  const [filter, updateURL] = useFilter();
  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  filter.tag === tag
                    ? 'text-white bg-blue-500 hover:bg-blue-600'
                    : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => {
                  updateURL({ ...filter, tag });
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => openUserModal(post.author)}
        >
          <img
            src={post.author?.image}
            alt={post.author?.username}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openPostDetail(post)}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post);
              setShowEditDialog(true);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <DeletePostButton postId={post.id} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostTableRow;
