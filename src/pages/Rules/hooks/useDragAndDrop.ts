import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { DragEndEvent } from '@dnd-kit/core';
import { handleDrag } from '@app/store/slices/rules';
import { useDispatch } from 'react-redux';

// Custom hook for handling drag and drop functionality
export const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    dispatch(handleDrag({ activeId: Number(active.id), overId: Number(over.id) }));
  };

  return { sensors, handleDragEnd };
};
