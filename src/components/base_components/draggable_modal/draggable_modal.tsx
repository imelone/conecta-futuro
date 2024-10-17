// File: /components/shared/DraggableModal.tsx
import React from "react";
import dynamic from "next/dynamic";
import styles from "./draggable_modal.module.css"; // Create CSS for this component

interface DraggableModalProps {
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void; // Use more specific type
  children: React.ReactNode;
}

const Draggable = dynamic(() => import("react-draggable"), { ssr: false });

const DraggableModal: React.FC<DraggableModalProps> = ({
  isMinimized,
  setIsMinimized,
  children,
}) => {
  const toggleMinimized = () => {
    console.log("isMinimized: ", isMinimized);
    const newMinimizedState = !isMinimized;
    console.log("Toggling minimize state to:", newMinimizedState);
    setIsMinimized(newMinimizedState);
  };

  return (
    <Draggable handle=".draggable-handle" bounds="parent">
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <div className={`draggable-handle ${styles.draggableHandle}`}>
            <button
              onClick={toggleMinimized}
              className={styles.minimizeButton}
              aria-label={isMinimized ? "Expand modal" : "Minimize modal"}
            >
              {isMinimized ? "+" : "-"}
            </button>
            <span className={styles.title}></span>
          </div>
        </div>
        <div className={styles.content}>
          {!isMinimized ? (
            children
          ) : (
            <div className={styles.minimizedView}></div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableModal;
