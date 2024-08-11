import { mount } from 'marketing/bootstrap' // magic function, again webpack will first try searching in local node module. but if cant find -> will look for module federation webpack config plugin
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function MarketingAppBootstrap() {
  const ref = useRef(null);
  
  const history = useHistory();
  
  useEffect(() => {
    if (!ref.current) return;
  
    const { parentEvents } = mount(ref.current, {
      // Callback Approach when dealing with Micro Frontends Communication
      onNavigate: (location) => {
        // ! Handle navigation sync between child (Memory Router) to container (Browser Router)
        const { pathname: nextPathname } = location;

        // To prevent infinite loop
        const { pathname } = history.location // current browser router pathname
        if (pathname === nextPathname) return;

        history.push(nextPathname)
      } 
    })

    // ! Handle navigation sync between container (Browser Router) to Child (Memory Router)
    const { onParentNavigate } = parentEvents;
    
    history.listen(onParentNavigate);
  }, [])

  return <div ref={ref}/>
}