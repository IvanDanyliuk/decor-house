import { CloseOutlined } from '@ant-design/icons';


interface IChip {
  text: string;
  onClose: () => void;
}


const Chip: React.FC<IChip> = ({ text, onClose }) => {
  return (
    <div className='px-4 py-2 flex items-center gap-3 border rounded-3xl bg-accent-dark text-white text-sm'>
      <span>{text}</span>
      <button onClick={onClose}>
        <CloseOutlined />
      </button>
    </div>
  );
};

export default Chip;