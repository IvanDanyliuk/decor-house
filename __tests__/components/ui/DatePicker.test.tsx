import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '@/components/ui/DatePicker';


describe('DatePicker tests', () => {
  test('should render the DatePicker component', () => {
    render(
      <DatePicker name='test' label='Test Label' />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('should change the date', async () => {
    render(
      <DatePicker name='test' label='Test Label' defaultValue='2024-01-25T16:19:09.000Z'  />
    );

    const dateInputs = screen.getAllByRole('textbox');
    fireEvent.click(dateInputs[1]);
    const dayBtn = screen.getByText('15');
    fireEvent.click(dayBtn)
    
    await waitFor(() => {
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('2024-01-15T16:19:09.000Z')
    });
  });
});