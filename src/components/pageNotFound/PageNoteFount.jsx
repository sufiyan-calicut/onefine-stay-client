import React from 'react';
import './pagenotfound.css';
import { useNavigate } from 'react-router-dom';

export default function PageNoteFount() {
  const navigate = useNavigate();
  return (
    <div className='errorbody'>
     
      <p className='zoom-area'>
        <b>Sir,</b>The page you are looking for does not exist.{' '}
      </p>
      <section className='error-container'>
        <span className='four'>
          <span className='screen-reader-text'>4</span>
        </span>
        <span className='zero'>
          <span className='screen-reader-text'>0</span>
        </span>
        <span className='four'>
          <span className='screen-reader-text'>4</span>
        </span>
      </section>
      <div className='link-container cursor-pointer'>
        <a target='_blank' className='more-link' rel='noreferrer' onClick={() => navigate('/')}>
          back to home
        </a>
      </div>
    </div>
  );
}
