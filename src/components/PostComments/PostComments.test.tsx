import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    beforeEach(() => {
        render(<Post />);
    });

    it('Deve renderizar o componente corretamente', () => {
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve adicionar dois comentários corretamente', async () => {
        const commentInput = screen.getByTestId('comment-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(commentInput, { target: { value: 'Primeiro comentário de teste' } });
        fireEvent.click(submitButton);

        fireEvent.change(commentInput, { target: { value: 'Segundo comentário de teste' } });
        fireEvent.click(submitButton);

        const commentItems = screen.getAllByTestId('comment-item');
        expect(commentItems).toHaveLength(2);
        
        expect(screen.getByText('Primeiro comentário de teste')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário de teste')).toBeInTheDocument();
    });

    it('Deve limpar o campo de comentário após o envio', () => {
        const commentInput = screen.getByTestId('comment-input') as HTMLTextAreaElement;
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(commentInput, { target: { value: 'Teste de limpeza' } });
        fireEvent.click(submitButton);

        expect(commentInput.value).toBe('');
    });
});