import React from 'react'
import SelectQuizForm from './SelectQuizForm'

const show_form = ({classroom_id, folder_id}) => {
    if(classroom_id!="undefined"){
        return (
            <div>
                <SelectQuizForm classID={classroom_id} folder_id={folder_id} />
            </div>
        )
    }
}

export default show_form