import { render } from '@testing-library/react';
import Card from '../components/Card/Card';


describe(Card, () => {

    it('Card contains image', () => {
        const { getByTestId } = render(<Card initialProps={null} />);
        const url = getByTestId('img').textContent;
        expect(url.length).toBeGreaterThan(0);
    });
})