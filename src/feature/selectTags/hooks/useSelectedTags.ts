import { useSelectTagsStore } from '../model/store';

const useSelectedTags = () => {
  const selectedTag = useSelectTagsStore((state) => state.selectedTag);
  const setSelectedTag = useSelectTagsStore((state) => state.setSelectedTag);

  return { selectedTag, setSelectedTag };
};

export default useSelectedTags;
