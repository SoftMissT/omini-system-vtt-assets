/**
 * 🎨 ASSET MANAGER
 * Centralized Icon & Asset Resolution
 */

class AssetManager {
  static BASE_PATH = "modules/omini-system-assets/assets/icons/";
  
  static _cache = {};

  static PATHS = {
    core: 'core/',
    skills: 'skills/',
    weapons: 'weapons/',
    armor: 'armors/',
    items: 'items/',
    ui: 'ui/'
  };

  /**
   * Get full path for an icon
   * @param {string} category - 'skills', 'weapons', etc.
   * @param {string} name - Filename without extension
   * @param {string} ext - Extension (default .webp)
   */
  static getIcon(category, name, ext = 'webp') {
    const folder = AssetManager.PATHS[category] || '';
    return `${AssetManager.BASE_PATH}${folder}${name}.${ext}`;
  }

  /**
   * Preload critical assets
   */
  static async preload() {
    // Add logic here to preload common UI assets if needed
    console.log("[ASSET MANAGER] Preloading assets...");
  }
}

// Attach to OmniCore
Hooks.once('ready', () => {
    if (window.OmniCore) {
        window.OmniCore.assets = AssetManager;
    }
});
