import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorPicker from '@/components/ui/ColorPicker';


const onChangeMock = jest.fn();

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: jest.fn()
  }
});

describe('ColorPicker tests', () => {
  test('should render the ColorPicker componentt', () => {
    render(
      <ColorPicker 
        name='test'
        label='Test Color Picker'
        title='Select a color'
        multiple
        onChange={onChangeMock}
      />
    );
    expect(screen.getByText('Test Color Picker')).toBeInTheDocument();
  });

  test('should add and delete colors: multiple is true', async () => {
    render(
      <ColorPicker 
        name='test'
        label='Test Color Picker'
        title='Select a color'
        multiple
        onChange={onChangeMock}
        defaultValue={['#000000', '#000000', '#000000']}
      />
    );

    const selectColorBtn = screen.getByRole('button', { name: 'Select a color' });
    fireEvent.click(selectColorBtn);

    const colorInput = screen.getAllByRole('textbox');
    fireEvent.change(colorInput[1], { target: { value: 'eeeeee' } });

    await waitFor(() => {
      const deleteColorBtns = screen.getAllByTestId('deleteColorBtn');
      fireEvent.click(deleteColorBtns[1]);
    });

    const clearColorsBtn = screen.getByTestId('clearColorsBtn');
    fireEvent.click(clearColorsBtn);

    expect(clearColorsBtn).not.toBeInTheDocument();
  });

  test('should add and delete colors: multiple is false', async () => {
    render(
      <ColorPicker 
        name='test'
        label='Test Color Picker'
        title='Select a color'
        onChange={onChangeMock}
        defaultValue={['#000000']}
      />
    );

    const selectColorBtn = screen.getByRole('button', { name: 'Select a color' });
    fireEvent.click(selectColorBtn);

    const colorInput = screen.getAllByRole('textbox');
    fireEvent.change(colorInput[1], { target: { value: 'eeeeee' } });

    const clearColorsBtn = screen.getByTestId('clearColorsBtn');
    fireEvent.click(clearColorsBtn);

    screen.debug(undefined, 300000)
    expect(clearColorsBtn).not.toBeInTheDocument();
  });
});