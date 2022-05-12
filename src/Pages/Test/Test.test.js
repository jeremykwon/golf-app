import { render, screen } from '@testing-library/react';
import Test from './Test';

// test('matches snapshot', () => {
//     const utils = render(<Test />);
//     // expect(utils.container).toBeInTheDocument();
//     expect(utils.container).toMatchSnapshot();  // 컴포넌트 수정시 원하는 방식으로 렌더 되는지 비교하기 위한 __snapshots__ 생성
// });

test('shows the props correctly', () => {
    const utils = render(<Test test='test1' />);
    utils.getByText('test1');
});
