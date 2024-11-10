import React from 'react'

type Props = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const EmptyDataPage = ({ icon, title, content }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        {icon}
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{content}</p>
    </div>
  )
}

export default EmptyDataPage