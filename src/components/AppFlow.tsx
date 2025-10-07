import { useState } from 'react';
import HeroSection from './HeroSection';
import ProfileSelection from './ProfileSelection';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import SignInExplanation from './SignInExplanation';
import VerificationError from './VerificationError';
import LoadingScreen from './LoadingScreen';
import VerificationScreen from './VerificationScreen';
import QwakDashboard from './QwakDashboard';

type AppState = 'hero' | 'profile-selection' | 'login' | 'signin' | 'signin-loading' | 'signin-explanation' | 'signin-error' | 'loading' | 'verification' | 'dashboard';
type ProfileType = 'driver' | 'business' | null;

export default function AppFlow() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleStartDemo = () => {
    setCurrentState('profile-selection');
  };

  const handleSelectProfile = (profile: 'driver' | 'business') => {
    setSelectedProfile(profile);
    setCurrentState('login');
  };

  const handleLogin = () => {
    setCurrentState('loading');
  };

  const handleGoToSignIn = () => {
    setCurrentState('signin');
  };

  const handleSignIn = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentState('signin-loading');
  };

  const handleSignInLoadingComplete = () => {
    // Verificar si el número es el específico que debe fallar
    if (phoneNumber === '+34 654321006' || phoneNumber === '+34654321006' || phoneNumber === '654321006') {
      setCurrentState('signin-error');
    } else {
      setCurrentState('signin-explanation');
    }
  };

  const handleSignInExplanationComplete = () => {
    setCurrentState('dashboard');
  };

  const handleLoadingComplete = () => {
    setCurrentState('verification');
  };

  const handleVerificationComplete = () => {
    setCurrentState('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentState('hero');
    setSelectedProfile(null);
  };

  const handleBackToProfileSelection = () => {
    setCurrentState('profile-selection');
    setSelectedProfile(null);
  };

  const handleLogout = () => {
    setCurrentState('hero');
    setSelectedProfile(null);
    setPhoneNumber('');
  };

  const handleRetryVerification = () => {
    setCurrentState('signin');
  };

  const handleAlternativeMethod = () => {
    setCurrentState('login');
  };

  switch (currentState) {
    case 'hero':
      return <HeroSection onStartDemo={handleStartDemo} />;
    
    case 'profile-selection':
      return (
        <ProfileSelection
          onSelectProfile={handleSelectProfile}
          onBack={handleBackToHero}
        />
      );
    
    case 'login':
      return (
        <LoginForm
          profileType={selectedProfile!}
          onLogin={handleLogin}
          onGoToSignIn={handleGoToSignIn}
          onBack={handleBackToProfileSelection}
        />
      );
    
    case 'signin':
      return (
        <SignInForm
          profileType={selectedProfile!}
          onSignIn={handleSignIn}
          onBack={() => setCurrentState('login')}
        />
      );
    
    case 'signin-loading':
      return <LoadingScreen onComplete={handleSignInLoadingComplete} duration={1500} />;
    
    case 'signin-error':
      return (
        <VerificationError
          onRetry={handleRetryVerification}
          onAlternativeMethod={handleAlternativeMethod}
        />
      );
    
    case 'signin-explanation':
      return (
        <SignInExplanation 
          onComplete={handleSignInExplanationComplete}
        />
      );
    
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    
    case 'verification':
      return <VerificationScreen onComplete={handleVerificationComplete} />;
    
    case 'dashboard':
      return <QwakDashboard profileType={selectedProfile!} onLogout={handleLogout} />;
    
    default:
      return <HeroSection onStartDemo={handleStartDemo} />;
  }
}