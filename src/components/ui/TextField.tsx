interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}


const TextField: React.FC<TextFieldProps> = ({ label, name, type, required }) => {
  return (
    <div className='w-full flex items-center gap-3'>
      <label htmlFor={name} className='w-36 text-sm font-semibold'>{label}</label>
      <input 
        className='px-3 h-10 grow text-sm border border-gray-regular rounded'
        id={name}
        type={type || 'text'} 
        name={name} 
        required={required} 
      />
    </div>
  );
};

export default TextField;