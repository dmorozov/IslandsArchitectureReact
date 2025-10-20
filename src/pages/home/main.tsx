import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Counter from '../../islands/Counter.island';
import UserProfile from '../../islands/UserProfile.island';

// Hydrate Counter Island
const counterElement = document.getElementById('counter-island');
if (counterElement) {
  createRoot(counterElement).render(
    <StrictMode>
      <Counter />
    </StrictMode>
  );
}

// Hydrate User Profile Island
const userProfileElement = document.getElementById('user-profile-island');
if (userProfileElement) {
  createRoot(userProfileElement).render(
    <StrictMode>
      <UserProfile />
    </StrictMode>
  );
}
