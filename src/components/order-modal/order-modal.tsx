import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '@components';
import { OrderInfo } from '@components';

interface OrderModalProps {
  onClose: () => void;
}

export const OrderModal: FC<OrderModalProps> = ({ onClose }) => {
  const { number } = useParams<{ number: string }>();

  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
