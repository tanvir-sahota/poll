import React from 'react'
import SelectQuestionForm from './SelectQuestionForm'

const show_form = ({classroom_id}) => {
    if(classroom_id!="undefined"){
        return (
            <div>
                <SelectQuestionForm classID={classroom_id} />
            </div>
        )
    }
}

export default show_form