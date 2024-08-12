import { mount } from 'auth/bootstrap'
import React, { useRef, useEffect, } from 'react';
import { useHistory } from 'react-router-dom';

export default function AuthAppBootstrap() {
  const ref = useRef(null);
  
  const history = useHistory();
  
  useEffect(() => {
    if (!ref.current) return;

    const events = {
      onNavigate: (location) => {
        const { pathname: nextPathname } = location;

        // To prevent infinite loop
        const { pathname } = history.location
        if (pathname === nextPathname) return;

        history.push(nextPathname)
      } 
    }

    const options = {
      initialPath: history.location.pathname
    }
  
    const { parentEvents } = mount(ref.current, events, options)

    const { onParentNavigate } = parentEvents;
    
    history.listen(onParentNavigate);
  }, [])

  return <div ref={ref}/>
}