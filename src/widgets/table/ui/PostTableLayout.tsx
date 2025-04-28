import { ReactNode } from 'react';
import {
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from '../../../shared/ui/Table';
import { Table } from '../../../shared/ui/Table';

const PostTableLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default PostTableLayout;
