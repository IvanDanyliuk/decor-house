import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactLinks from '@/components/ui/ContactLinks';


describe('AuthButton tests', () => {
  test('should render the AuthButton component', () => {
    render(
      <ContactLinks />
    );
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
});