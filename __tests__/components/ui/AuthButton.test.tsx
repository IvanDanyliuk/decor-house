import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthButton from '@/components/ui/AuthButton';


describe('AuthButton tests', () => {
  test('should render the AuthButton component', () => {
    render(
      <AuthButton session={null} />
    );
    expect(screen.getByText('Sign In with Google')).toBeInTheDocument();
  });
});