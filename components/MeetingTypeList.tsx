import Image from 'next/image'
import React from 'react'

type MeetingTypeListProps = {
  img: string
  title: string
}

const MeetingTypeList = ({img, title}: MeetingTypeListProps) => {
  return (
    <div className='flex flex-col gap-1 my-auto'>
      <Image
      src={img}
      width={40}
      height={40}
      alt={title}
      />
      <p className='text-sm text-black'>{title}</p>
    </div>
  )
}

export default MeetingTypeList