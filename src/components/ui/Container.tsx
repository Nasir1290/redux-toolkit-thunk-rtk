import { ReactNode } from 'react';

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return <div className="h-screen w-[95%] max-w-7xl mx-auto">{children}</div>;
};

export default Container;
