import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextareaField from '@/components/ui/TextareaField';



describe('TextareaField tests', () => {
  test('should render the TextareaField component', () => {
    render(
      <TextareaField name='content' label='Content' defaultValue='Default Content' />
    );

    expect(screen.getByText('Default Content')).toBeInTheDocument();
  });

  test('should render an error', () => {
    render(
      <TextareaField name='content' label='Content' error={['Error']} />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});