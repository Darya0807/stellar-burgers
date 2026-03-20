import { FC } from 'react';
import { Modal } from '@components';
import { IngredientDetails } from '@components';

interface IngredientModalProps {
  onClose: () => void;
}

export const IngredientModal: FC<IngredientModalProps> = ({ onClose }) => (
  <Modal title='Детали ингредиента' onClose={onClose}>
    <IngredientDetails />
  </Modal>
);
