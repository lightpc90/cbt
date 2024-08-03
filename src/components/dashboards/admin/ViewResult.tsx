import React from 'react'
import Result from '../examiner/Result'

const ViewResult = ({userInfo, data}) => {
  return (
    <div>
      <Result userInfo={userInfo} data={data}/>
    </div>
  )
}

export default ViewResult