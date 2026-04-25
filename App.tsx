import React from 'react';
import LoginView from './components/auth/LoginView';

export default function App() {
  return (
    <LoginView
      onLogin={() => console.log('login tapped')}
      onNavigateToSignUp={() => console.log('sign up tapped')}
    />
  );
}
