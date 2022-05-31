import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Test from './Test';

// Counter Test
describe('Counter test', () => {

    // test 가 실행, 종료 시마다 실행하는 전 처리기
    beforeEach(() => {
        // tmp = 1;
        console.log('start!!!!!!!!!!!!')
    });

    // test 가 실행, 종료 시마다 실행하는 후 처리기
    afterEach(() => {
        console.log('end!!!!!!!!!!!!')
    });

    // 동기
    it('should render Counter', () => {

        render(<Test />);

        /* 두 쿼리 모두 같은 element 탐색(문자열 대신 정규식 탐색도 가능) */
        // screen.getByRole('button', { name: '+' });
        // screen.getByText('+');

        const target = screen.getByRole('button', { name: '+' });   // name 옵션으로 text match
        // fireEvent.click(target);
        userEvent.click(target);

        expect(screen.getByText('1')).toBeTruthy();
    });
});

// describe('Fetch', () => {
//     it('should load result', async () => {
//         render(<Test />);

//         try {
//             expect(screen.getByText('Loading')).toBeInTheDocument();
//             // 1)
//             expect(await screen.findAllByRole('listitem')).toHaveLength(2);
//             done();
//         } catch (error) {
//             console.log(error)
//             done(error);
//         }

//         // 2)
//         await waitFor(() => {

//             expect(screen.getAllByRole('listitem')).toHaveLength(2);
//         });
//     });
// });

// test('matches snapshot', () => {
//     const utils = render(<Test />);
//     // expect(utils.container).toBeInTheDocument();
//     expect(utils.container).toMatchSnapshot();  // 컴포넌트 수정시 원하는 방식으로 렌더 되는지 비교하기 위한 __snapshots__ 생성
// });

//

// test('shows the props correctly', () => {
//     const utils = render(<Test text='test' />); // utils에는 DOM을 선택할 수 있는 쿼리들과 container가 반환된다.
//     utils.getByText('test');   // test1 이라는 텍스트를 가진 엘리먼트가 있는지 확인
//     utils.getByText(/[a-zA-Z0-9]/);      // 정규식을 통과하는 엘리먼트가 있는지 확인
// });


/* 버튼 클릭 */
// fireEvent.click(screen.getByText('Load'))

/*  */
// const items = await screen.findAllByText(/Item #[0-9]: /)
// expect(items).toHaveLength(10)

// screen.getByRole('button', { name: '+' });


// byrole
// https://testing-library.com/docs/queries/byrole/