import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '@/components/ui/TextField';


describe('TextField tests', () => {
  test('should render the TextField component', () => {
    render(
      <TextField name='name' label='Name' defaultValue='John' />
    );

    expect(screen.getByRole('textbox')).toHaveValue('John');
  });

  test('should render an error', () => {
    render(
      <TextField name='name' label='Name' error={['Error']} />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});