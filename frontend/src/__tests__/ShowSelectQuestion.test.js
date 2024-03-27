import React from 'react';
import { render } from '@testing-library/react';
import ShowSelectQuestion from '../components/ShowSelectQuestion';

jest.mock('../components/SelectQuestionForm', () => () => <div data-testid="mock-select-question-form" />);

describe('show_form', () => {
  it('displays "No classroom linked to this quiz" message when classroom_id is undefined', () => {
    const { getByText } = render(<ShowSelectQuestion classroom_id={undefined} quiz_id="testQuizId" />);
    expect(getByText('No classroom linked to this quiz.')).toBeInTheDocument();
  });

  it('displays "No quiz to update" message when quiz_id is undefined', () => {
    const { getByText } = render(<ShowSelectQuestion classroom_id="testClassroomId" quiz_id={undefined} />);
    expect(getByText('No quiz to update.')).toBeInTheDocument();
  });

  it('renders SelectQuestionForm when both classroom_id and quiz_id are defined', () => {
    const { getByTestId } = render(<ShowSelectQuestion classroom_id="testClassroomId" quiz_id="testQuizId" />);
    expect(getByTestId('mock-select-question-form')).toBeInTheDocument();
  });
});
