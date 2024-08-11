import { mount as mountMarketing } from 'marketing/bootstrap' // magic function, again webpack will first try searching in local node module. but if cant find -> will look for module federation webpack config plugin
import React, { useRef, useEffect } from 'react';

export default function MarketingAppBootstrap() {
  useEffect(() => {
    if (!ref.current) return;
    
    mountMarketing(ref.current)
  }, [ref])

  const ref = useRef(null);

  return <div ref={ref}/>
}