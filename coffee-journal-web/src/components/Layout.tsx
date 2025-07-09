import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <LayoutContainer className={className}>
      {children}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 420px; /* iPhone 12 Pro Max width */
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
`;

export default Layout;
