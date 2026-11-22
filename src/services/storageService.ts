import { Investigation } from '../types/echo';
import { PRELOADED_INVESTIGATIONS } from '../data/preloadedInvestigations';

const STORAGE_KEY = 'echo_investigations_v1';
const ACTIVE_ID_KEY = 'echo_active_investigation_id_v1';

export class StorageService {
  /**
   * Retrieves all saved investigations (merging preloads if empty)
   */
  static getInvestigations(): Investigation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with preloaded investigations
        this.saveAllInvestigations(PRELOADED_INVESTIGATIONS);
        return PRELOADED_INVESTIGATIONS;
      }
      const parsed = JSON.parse(stored) as Investigation[];
      return parsed.length > 0 ? parsed : PRELOADED_INVESTIGATIONS;
    } catch (err) {
      console.error('Failed to load investigations from storage:', err);
      return PRELOADED_INVESTIGATIONS;
    }
  }

  /**
   * Saves all investigations to localStorage
   */
  static saveAllInvestigations(list: Investigation[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save investigations:', err);
    }
  }

  /**
   * Saves or updates a single investigation
   */
  static saveInvestigation(inv: Investigation): void {
    const all = this.getInvestigations();
    const existingIndex = all.findIndex((i) => i.id === inv.id);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...inv, updatedAt: new Date().toISOString() };
    } else {
      all.unshift({ ...inv, updatedAt: new Date().toISOString() });
    }
    this.saveAllInvestigations(all);
    this.setActiveInvestigationId(inv.id);
  }

  /**
   * Renames an investigation
   */
  static renameInvestigation(id: string, newTitle: string): Investigation | null {
    const all = this.getInvestigations();
    const inv = all.find((i) => i.id === id);
    if (!inv) return null;
    inv.claim = newTitle;
    inv.updatedAt = new Date().toISOString();
    this.saveAllInvestigations(all);
    return inv;
  }

  /**
   * Deletes an investigation by ID
   */
  static deleteInvestigation(id: string): void {
    const all = this.getInvestigations();
    const filtered = all.filter((i) => i.id !== id);
    this.saveAllInvestigations(filtered);
    if (this.getActiveInvestigationId() === id) {
      if (filtered.length > 0) {
        this.setActiveInvestigationId(filtered[0].id);
      } else {
        localStorage.removeItem(ACTIVE_ID_KEY);
      }
    }
  }

  /**
   * Resets workspace to pristine preloaded state
   */
  static resetWorkspace(): Investigation[] {
    this.saveAllInvestigations(PRELOADED_INVESTIGATIONS);
    this.setActiveInvestigationId(PRELOADED_INVESTIGATIONS[0].id);
    return PRELOADED_INVESTIGATIONS;
  }

  /**
   * Active investigation ID getter/setter
   */
  static getActiveInvestigationId(): string {
    return localStorage.getItem(ACTIVE_ID_KEY) || PRELOADED_INVESTIGATIONS[0].id;
  }

  static setActiveInvestigationId(id: string): void {
    localStorage.setItem(ACTIVE_ID_KEY, id);
  }
}
