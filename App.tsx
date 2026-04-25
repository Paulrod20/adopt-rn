import React from 'react';
import SignUpView from './components/auth/SignUpView';

export default function App() {
  return (
    <SignUpView
      onSignUp={() => console.log('sign up tapped')}
      onNavigateToLogin={() => console.log('back to login')}
    />
  );
}
