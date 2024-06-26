import React from 'react'
import SelectQuestionForm from '../forms/SelectQuestionForm'

const show_form = ({classroom_id, quiz_id}) => {
    if(classroom_id===undefined || classroom_id==="undefined"){
        return (
            <div>
                <h3>No classroom linked to this quiz.</h3>
            </div>
        )
    }
    else if(quiz_id===undefined || quiz_id==="undefined"){
        return (
            <div>
                <h3>No quiz to update.</h3>
            </div>
        )
    }
    else{
        return (
            <div>
                <SelectQuestionForm classID={classroom_id} quiz_id={quiz_id}/>
            </div>
        )
    }
}

export default show_form