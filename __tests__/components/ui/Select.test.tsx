import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '@/components/ui/Select';
import { products } from '@/utils/test-data-mocks/product.mocks';


const onChangeMock = jest.fn();

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: jest.fn()
  }
});

const options = products.map(option => ({ label: option.name, value: option._id! }));
const defaultValue = products.map(product => product._id!);


describe('Select tests', () => {
  test('should render the Select component', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} />
    );

    expect(screen.getByText('Select Products')).toBeInTheDocument();
  });

  test('should add products to the list by clicking on the checkbox', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} multiple />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[0]);

    expect(listItems).toHaveLength(options.length + 1);
  });

  test('should uncheck a product by clicking on the checkbox', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[0]);
    fireEvent.click(listItems[0]);

    expect(listItems).toHaveLength(options.length);
  });

  test('should uncheck checked items with a default value', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} multiple defaultValue={defaultValue.slice(0, 1).join(', ')} />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[1]);

    expect(listItems).toHaveLength(options.length + 1);
  });

  test('should unselect all items', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} multiple defaultValue={defaultValue.join(', ')} />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[0]);
    fireEvent.click(openSelectBtn);
    fireEvent.click(listItems[0]);
    
    expect(listItems).toHaveLength(options.length + 1);
  });

  test('should call the onChange function', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} multiple defaultValue={defaultValue.join(', ')} onChange={onChangeMock} />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[0]);
    
    expect(onChangeMock).toHaveBeenCalled();
  });

  test('should uncheck a checked item', () => {
    render(
      <Select name='products' label='Select Products' title='Select products' options={options} multiple onChange={onChangeMock} />
    );

    const openSelectBtn = screen.getByRole('button');
    fireEvent.click(openSelectBtn);

    const listItems = screen.getAllByTestId('selectProductCheckbox');
    fireEvent.click(listItems[1]);

    fireEvent.click(openSelectBtn);
    fireEvent.click(listItems[1]);
    
    expect(onChangeMock).toHaveBeenCalled();
  });
});