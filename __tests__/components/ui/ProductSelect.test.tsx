import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSelect from '@/components/ui/ProductSelect';
import { products } from '@/utils/test-data-mocks/product.mocks';


const onChangeMock = jest.fn();

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: jest.fn()
  }
});

describe('ProductSelect tests', () => {
  test('should render the ProductSelect component', () => {
    render(
      <ProductSelect 
        label='Select Products' 
        products={products} 
        onChange={onChangeMock} 
      />
    );

    screen.debug(undefined, 300000)
    expect(screen.getByText(`${products.length} products available`)).toBeInTheDocument()
  });

  test('should open the modal window by clicking on the Add Products button', () => {
    render(
      <ProductSelect 
        label='Select Products' 
        products={products} 
        onChange={onChangeMock} 
      />
    );

    const selectProductsBtn = screen.getByRole('button');
    fireEvent.click(selectProductsBtn);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(products.length);
  });

  test('should check a product by clicking on the checkbox element', () => {
    render(
      <ProductSelect 
        label='Select Products' 
        products={products} 
        onChange={onChangeMock} 
      />
    );

    const selectProductsBtn = screen.getByRole('button');
    fireEvent.click(selectProductsBtn);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(screen.getAllByTestId('selectedProduct')).toHaveLength(1);
  });

  test('should uncheck a checked product by clicking on the checkbox element', () => {
    render(
      <ProductSelect 
        label='Select Products' 
        products={products} 
        onChange={onChangeMock} 
      />
    );

    const selectProductsBtn = screen.getByRole('button');
    fireEvent.click(selectProductsBtn);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[0]);

    expect(screen.queryAllByTestId('selectedProduct')).toHaveLength(0);
  });

  test('should delete checked product from the checked products list', () => {
    render(
      <ProductSelect 
        label='Select Products' 
        products={products} 
        onChange={onChangeMock} 
      />
    );

    const selectProductsBtn = screen.getByRole('button');
    fireEvent.click(selectProductsBtn);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const deleteProductBtn = screen.getByTestId('deleteProductBtn');
    fireEvent.click(deleteProductBtn);
    
    expect(screen.queryAllByTestId('selectedProduct')).toHaveLength(0);
  });
});