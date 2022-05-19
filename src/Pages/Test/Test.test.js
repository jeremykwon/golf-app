import { render, screen } from '@testing-library/react';
import Test from './Test';

// test('matches snapshot', () => {
//     const utils = render(<Test />);
//     // expect(utils.container).toBeInTheDocument();
//     expect(utils.container).toMatchSnapshot();  // 컴포넌트 수정시 원하는 방식으로 렌더 되는지 비교하기 위한 __snapshots__ 생성
// });

// 
test('shows the props correctly', () => {
    const utils = render(<Test text='test' />); // utils에는 DOM을 선택할 수 있는 쿼리들과 container가 반환된다.
    utils.getByText('test');   // test1 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText(/[a-zA-Z0-9]/);      // 정규식을 통과하는 엘리먼트가 있는지 확인
});


/* 버튼 클릭 */
// fireEvent.click(screen.getByText('Load'))

/*  */
// const items = await screen.findAllByText(/Item #[0-9]: /)
// expect(items).toHaveLength(10)

// screen.getByRole('button', { name: '+' });
