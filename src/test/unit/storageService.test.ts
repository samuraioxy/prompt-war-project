import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../../services/storageService';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with preloaded investigations if storage is empty', () => {
    const list = StorageService.getInvestigations();
    expect(list.length).toBe(PRELOADED_INVESTIGATIONS.length);
    expect(list[0].id).toBe(PRELOADED_INVESTIGATIONS[0].id);
  });

  it('saves and updates a single investigation', () => {
    const custom = {
      ...PRELOADED_INVESTIGATIONS[0],
      id: 'custom-inv-123',
      claim: 'Custom claim for test'
    };
    StorageService.saveInvestigation(custom);
    const list = StorageService.getInvestigations();
    const found = list.find((i) => i.id === 'custom-inv-123');
    expect(found).toBeDefined();
    expect(found?.claim).toBe('Custom claim for test');
    expect(StorageService.getActiveInvestigationId()).toBe('custom-inv-123');
  });

  it('renames an investigation successfully', () => {
    const list = StorageService.getInvestigations();
    const target = list[0];
    const updated = StorageService.renameInvestigation(target.id, 'Renamed Claim Title');
    expect(updated).not.toBeNull();
    expect(updated?.claim).toBe('Renamed Claim Title');

    const refreshed = StorageService.getInvestigations();
    expect(refreshed.find((i) => i.id === target.id)?.claim).toBe('Renamed Claim Title');
  });

  it('deletes an investigation by ID', () => {
    const initialList = StorageService.getInvestigations();
    const toDeleteId = initialList[0].id;
    StorageService.deleteInvestigation(toDeleteId);

    const refreshed = StorageService.getInvestigations();
    expect(refreshed.find((i) => i.id === toDeleteId)).toBeUndefined();
    expect(refreshed.length).toBe(initialList.length - 1);
  });

  it('resets workspace back to pristine preloaded state', () => {
    StorageService.saveInvestigation({
      ...PRELOADED_INVESTIGATIONS[0],
      id: 'temporary-to-wipe'
    });
    expect(StorageService.getInvestigations().some((i) => i.id === 'temporary-to-wipe')).toBe(true);

    const reset = StorageService.resetWorkspace();
    expect(reset.length).toBe(PRELOADED_INVESTIGATIONS.length);
    expect(reset.some((i) => i.id === 'temporary-to-wipe')).toBe(false);
  });
});
