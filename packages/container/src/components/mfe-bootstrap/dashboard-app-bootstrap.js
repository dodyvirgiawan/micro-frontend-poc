import { mount } from 'dashboard/bootstrap'
import React, { useRef, useEffect } from 'react';

export default function DashboardAppBootstrap() {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;

    mount(ref.current);
  }, [])

  return <div ref={ref}/>
}