const FEATURE_FLAGS = {
  newNav: 'feature_new_nav',
  embeddedAudio: 'feature_embedded_audio',
  epkLinktree: 'feature_epk_linktree',
  apiHostedData: 'feature_api_hosted_data',
};

export const getFeatureFlag = (flagName) => {
  const flag = FEATURE_FLAGS[flagName];
  if (!flag) {
    console.warn(`Unknown feature flag: ${flagName}`);
    return false;
  }
  return localStorage.getItem(flag) === 'true';
};

export const setFeatureFlag = (flagName, value) => {
  const flag = FEATURE_FLAGS[flagName];
  if (!flag) {
    console.warn(`Unknown feature flag: ${flagName}`);
    return;
  }
  localStorage.setItem(flag, value ? 'true' : 'false');
};

export const getAllFeatureFlags = () => {
  return Object.keys(FEATURE_FLAGS).reduce((acc, key) => {
    acc[key] = getFeatureFlag(key);
    return acc;
  }, {});
};

export const FEATURE_FLAG_DESCRIPTIONS = {
  newNav: 'Force directed graph navigation',
  embeddedAudio: 'Embedded audio player on pages',
  epkLinktree: 'EPK/Linktree functionality',
  apiHostedData: 'API-hosted data (vs local JSON)',
};

export const isAdminAuthenticated = () => {
  return sessionStorage.getItem('admin_auth') === 'wrc2026admin';
};
