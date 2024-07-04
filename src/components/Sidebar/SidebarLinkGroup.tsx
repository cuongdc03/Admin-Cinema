import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarLinkGroupProps {
  title: string
  items: {
    title: string
    icon: React.ReactElement
    path: string
    active?: boolean
  }[]
}

const SidebarLinkGroup = ({ title, items }: SidebarLinkGroupProps) => {
  return (
    <div className='mb-4'>
      <h6 className='mb-2 text-sm font-medium uppercase text-white dark:text-white'>{title}</h6>
      <ul className='space-y-2'>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center rounded-md px-4 py-2 text-sm font-medium 
                ${item.active ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span className='ml-4'>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarLinkGroup
