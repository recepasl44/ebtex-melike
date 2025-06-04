import { useEffect, useState } from 'react';

/**
 * @description Sezon ve şube verilerini localStorage üzerinden yöneten özel hook.
 */

export function useSeasonsBranches() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.seasons) setSeasons(userData.seasons);
        if (userData.branches) setBranches(userData.branches);
        if (userData.default_season?.id) setSelectedSeason(userData.default_season.id);
        if (userData.default_branche?.id) setSelectedBranch(userData.default_branche.id);
      } catch (err) {
        console.error('Invalid userData in localStorage:', err);
      }
    }
  }, []);

  const handleSeasonChange = (newSeasonId: number) => {
    setSelectedSeason(newSeasonId);
    updateLocalStorage('default_season', newSeasonId, seasons);
  };

  const handleBranchChange = (newBranchId: number) => {
    setSelectedBranch(newBranchId);
    updateLocalStorage('default_branche', newBranchId, branches);
  };

  function updateLocalStorage(key: 'default_season' | 'default_branche', id: number, arr: any[]) {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    const found = arr.find((item) => item.id === id);
    if (found) {
      userData[key] = found;
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log(`Updated ${key} to:`, found.name);
    }
  }

  return {
    seasons,
    branches,
    selectedSeason,
    selectedBranch,
    handleSeasonChange,
    handleBranchChange,
  };
}
