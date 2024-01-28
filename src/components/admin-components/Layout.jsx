import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './layout.css';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  // const { user } = useSelector((state) => state.user);
  const Location = useLocation();
  const navigate = useNavigate();

  const Menu = [
    {
      name: 'Home',
      path: '/admin/dashboard',
      icon: 'ri-home-line',
    },
    {
      name: 'Users',
      path: '/admin/userslist',
      icon: 'ri-user-line',
    },
    {
      name: 'Hotels',
      path: '/admin/hotel-management',
      icon: 'ri-hotel-bed-line',
    },
    {
      name: 'Bookings',
      path: '/admin/booking-management',
      icon: 'ri-book-open-line',
    },
    {
      name: 'Sales Report',
      path: '/admin/sales-report',
      icon: 'ri-folder-chart-line',
    },
  ];

  return (
    <div className='mainz '>
      <div className='flex'>
        <div className='sideBar'>
          <div className='sidebar-header'>
            <h1>Roomie.com</h1>
          </div>
          <div className='menu'>
            {Menu.map((menu, i) => {
              const isActive = Location.pathname === menu.path;
              return (
                <div key={i} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className='d-flex menu-item '
              onClick={() => {
                localStorage.removeItem('adminToken');
                navigate('/admin');
              }}
            >
              <i className='ri-logout-circle-r-line'></i>
              {!collapsed && (
                <a
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                  }}
                >
                  Logout
                </a>
              )}
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='header'>
            {collapsed ? (
              <i className='ri-menu-2-line header-action-icon' onClick={() => setCollapsed(false)}></i>
            ) : (
              <i className='ri-close-fill header-action-icon' onClick={() => setCollapsed(true)}></i>
            )}

        
          </div>
          <div className='layout-body first-letter overflow-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
