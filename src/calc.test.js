import add from './calc';

// test 생성하는 함수
test('add correctly', () => {
    expect(add(3, 5)).toBe(8);  // expect: 괄호안의 구문 테스트, toBe: 해당 조건으로 값이 일치하는지
})