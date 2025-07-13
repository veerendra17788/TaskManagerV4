import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, title, description, dueDate, priority }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    background: '#f9f9f9',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      {...attributes}
      {...listeners}
    >
      <h5>{title}</h5>
      <p>{description}</p>
      <p>📅 {dueDate}</p>
      <p>🔥 {priority}</p>
      <button>Edit</button>
    </div>
  );
}
