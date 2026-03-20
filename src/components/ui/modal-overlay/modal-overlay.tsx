import styles from './modal-overlay.module.css';

interface ModalOverlayUIProps {
  onClick: () => void;
  'data-cy'?: string;
}

export const ModalOverlayUI = ({
  onClick,
  'data-cy': dataCy
}: ModalOverlayUIProps) => (
  <div
    className={styles.overlay}
    onClick={onClick}
    data-cy={dataCy || 'modal-overlay'}
  />
);
