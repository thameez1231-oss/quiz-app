import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const STORAGE_KEYS = {
  USER: 'quizkids_active_user',
  HISTORY: 'quizkids_history',
  STREAK: 'quizkids_streak',
  SETTINGS: 'quizkids_accessibility',
};

export function UserProvider({ children }) {
  // Active logged-in student or guest
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Quiz attempt history
  const [quizHistory, setQuizHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Learning streak
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (saved) return JSON.parse(saved);
      return { count: 1, lastDate: new Date().toISOString().split('T')[0] };
    } catch {
      return { count: 1, lastDate: new Date().toISOString().split('T')[0] };
    }
  });

  // Accessibility toggles
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : { largeText: false, highContrast: false };
    } catch {
      return { largeText: false, highContrast: false };
    }
  });

  // Sync user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  // Sync quiz history
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Sync streak
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  }, [streak]);

  // Sync accessibility classes on document.body
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(accessibility));
    if (accessibility.largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }

    if (accessibility.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [accessibility]);

  // User actions
  const login = ({ name, classLevel, avatar, pin }) => {
    const student = {
      name: name.trim() || 'Super Star',
      classLevel: classLevel || '1',
      avatar: avatar || 'owl',
      pin: pin || '',
      isGuest: false,
      joinedAt: new Date().toISOString(),
    };
    setUser(student);
    updateStreak();
    return student;
  };

  const continueAsGuest = (classLevel = '1', avatar = 'lion') => {
    const guestUser = {
      name: 'Curious Explorer',
      classLevel: classLevel,
      avatar: avatar,
      pin: '',
      isGuest: true,
      joinedAt: new Date().toISOString(),
    };
    setUser(guestUser);
    updateStreak();
    return guestUser;
  };

  const logout = () => {
    setUser(null);
  };

  const setClassLevel = (classLevel) => {
    if (user) {
      setUser((prev) => ({ ...prev, classLevel }));
    }
  };

  const setAvatar = (avatar) => {
    if (user) {
      setUser((prev) => ({ ...prev, avatar }));
    }
  };

  // Streak tracker logic
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setStreak((prev) => {
      if (!prev || !prev.lastDate) {
        return { count: 1, lastDate: today };
      }
      if (prev.lastDate === today) {
        return prev;
      }
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (prev.lastDate === yesterdayStr) {
        return { count: prev.count + 1, lastDate: today };
      } else {
        return { count: 1, lastDate: today };
      }
    });
  };

  // Save completed quiz result
  const saveQuizResult = (result) => {
    const newRecord = {
      id: 'quiz_' + Date.now(),
      timestamp: new Date().toISOString(),
      userName: user ? user.name : 'Guest',
      ...result,
    };
    setQuizHistory((prev) => [newRecord, ...prev]);
    updateStreak();
    return newRecord;
  };

  // Total stars calculated across history
  const totalStars = quizHistory.reduce((sum, item) => sum + (item.starsEarned || 0), 0);

  const toggleLargeText = () => {
    setAccessibility((prev) => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleHighContrast = () => {
    setAccessibility((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        continueAsGuest,
        logout,
        setClassLevel,
        setAvatar,
        quizHistory,
        saveQuizResult,
        streak,
        totalStars,
        accessibility,
        toggleLargeText,
        toggleHighContrast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
