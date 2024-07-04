import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkGroupProps {
  title: string;
  items: {
    title: string;
    icon: React.ReactElement; // Now expects a React element
    path: string;
  }[];
}

const SidebarLinkGroup = ({ title, items }: SidebarLinkGroupProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-bold text-sm uppercase text-gray-400">
        {title}
      </h4>
      <ul className="mt-2 space-y-1">
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.path} className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            {item.icon}  
            <span className="ml-2 font-medium text-gray-500">{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default SidebarLinkGroup;