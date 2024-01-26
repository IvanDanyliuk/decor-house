import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/ui/Pagination';


const getSearchParamsMock = jest.fn();

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({ pathname: '' }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }),
    useSearchParams: () => ({ get: getSearchParamsMock }),
    useServerInsertedHTML: jest.fn()
  };
});


describe('Pagination tests', () => {
  test('should render the Pagination component: prev button', () => {
    getSearchParamsMock.mockReturnValue('5');

    render(
      <Pagination itemsCount={20} />
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('should render the Pagination component: next button', () => {
    getSearchParamsMock.mockReturnValue('15');
    render(
      <Pagination itemsCount={20} />
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});