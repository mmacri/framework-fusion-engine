// Master Framework data persistence utilities

import { MasterFrameworkRecord } from '../types/masterFramework';

const STORAGE_KEYS = {
  MASTER_LIST: 'master_framework_data',
  TRIPWIRE_CORE: 'tripwire_core_data',
  ALERT_DATA: 'alert_framework_data'
};

export function saveMasterFrameworkData(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  data: MasterFrameworkRecord[]
): void {
  try {
    const key = framework === 'Master List' ? STORAGE_KEYS.MASTER_LIST 
               : framework === 'Tripwire Core' ? STORAGE_KEYS.TRIPWIRE_CORE 
               : STORAGE_KEYS.ALERT_DATA;
    
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save framework data:', error);
  }
}

export function loadMasterFrameworkData(
  framework: 'Master List' | 'Tripwire Core' | 'Alert'
): MasterFrameworkRecord[] {
  try {
    const key = framework === 'Master List' ? STORAGE_KEYS.MASTER_LIST 
               : framework === 'Tripwire Core' ? STORAGE_KEYS.TRIPWIRE_CORE 
               : STORAGE_KEYS.ALERT_DATA;
    
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load framework data:', error);
    return [];
  }
}

export function addRecord(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  record: MasterFrameworkRecord
): void {
  const existingData = loadMasterFrameworkData(framework);
  const updatedData = [...existingData, record];
  saveMasterFrameworkData(framework, updatedData);
}

export function updateRecord(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  recordId: string,
  updates: Partial<MasterFrameworkRecord>
): void {
  const existingData = loadMasterFrameworkData(framework);
  const updatedData = existingData.map(record => 
    record.id === recordId ? { ...record, ...updates } : record
  );
  saveMasterFrameworkData(framework, updatedData);
}

export function deleteRecord(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  recordId: string
): void {
  const existingData = loadMasterFrameworkData(framework);
  const filteredData = existingData.filter(record => record.id !== recordId);
  saveMasterFrameworkData(framework, filteredData);
}

export function deleteMultipleRecords(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  recordIds: string[]
): void {
  const existingData = loadMasterFrameworkData(framework);
  const filteredData = existingData.filter(record => !recordIds.includes(record.id));
  saveMasterFrameworkData(framework, filteredData);
}

export function deleteAllRecords(
  framework: 'Master List' | 'Tripwire Core' | 'Alert'
): void {
  saveMasterFrameworkData(framework, []);
}

export function exportFrameworkData(
  framework: 'Master List' | 'Tripwire Core' | 'Alert'
): void {
  const data = loadMasterFrameworkData(framework);
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${framework.toLowerCase().replace(/\s+/g, '-')}-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importFrameworkData(
  framework: 'Master List' | 'Tripwire Core' | 'Alert',
  jsonData: string,
  mode: 'replace' | 'merge' = 'merge'
): MasterFrameworkRecord[] {
  try {
    const newRecords: MasterFrameworkRecord[] = JSON.parse(jsonData);
    
    if (mode === 'replace') {
      saveMasterFrameworkData(framework, newRecords);
      return newRecords;
    } else {
      const existingData = loadMasterFrameworkData(framework);
      const mergedData = [...existingData, ...newRecords];
      saveMasterFrameworkData(framework, mergedData);
      return mergedData;
    }
  } catch (error) {
    console.error('Failed to import framework data:', error);
    throw new Error('Invalid JSON format');
  }
}