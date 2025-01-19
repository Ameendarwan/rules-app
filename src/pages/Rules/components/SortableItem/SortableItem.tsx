import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { TableRow } from '@app/components/Table/Table';
import { useSortable } from '@dnd-kit/sortable';

interface SortableItemProps {
  id: number;
  data: Record<string, unknown>;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, data, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </TableRow>
  );
};

export default SortableItem;
