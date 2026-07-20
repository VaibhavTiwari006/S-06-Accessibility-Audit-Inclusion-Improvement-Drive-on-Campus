import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/dashboard" className="text-gray-500 hover:text-primary transition-colors flex items-center">
            <Home size={14} className="mr-2" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight size={14} className="text-gray-400 mx-1" />
              {item.href ? (
                <Link to={item.href} className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-textMain">{item.label}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
