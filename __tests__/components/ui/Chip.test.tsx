import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from '@/components/ui/Chip';


const onCloseMock = jest.fn();

describe('Chip tests', () => {
  test('should render the Chip component with passed text', () => {
    render(
      <Chip text='Test text' onClose={onCloseMock} />
    );
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  test('should call the onClose functio by cliking on the Close button', () => {
    render(
      <Chip text='Test text' onClose={onCloseMock} />
    );
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });
});