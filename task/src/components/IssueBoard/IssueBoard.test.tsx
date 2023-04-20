import { render } from '@testing-library/react';
import IssueBoard from '../IssueBoard/IssueBoard';

describe('IssueBoard', () => {
    test('renders all boards and issues', () => {
        const boards = [
            {
                id: 1,
                title: 'Board 1',
                items: [
                    { id: 1, title: 'Issue 1', number: 1, user: { login: 'user1' }, comments: '', created_at: '' },
                    { id: 2, title: 'Issue 2', number: 2, user: { login: 'user2' }, comments: '', created_at: '' },
                ],
            },
            {
                id: 2,
                title: 'Board 2',
                items: [
                    { id: 3, title: 'Issue 3', number: 3, user: { login: 'user3' }, comments: '', created_at: '' },
                ],
            },
        ];
        const setBoards = jest.fn();
        const { getByRole, getByText } = render(
            <IssueBoard boards={boards} setBoards={setBoards} />,
        );
        const boardWrapper = getByRole('board__wrapper');
        expect(boardWrapper.childElementCount).toBe(2);
        expect(getByText('Board 1')).toBeInTheDocument();
        expect(getByText('Board 2')).toBeInTheDocument();
    });
});
