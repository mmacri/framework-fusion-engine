
import { Control, ControlRelationship } from '../types/report';
import { nistControls } from './controls/nistControls';
import { pciControls } from './controls/pciControls';
import { hipaaControls } from './controls/hipaaControls';
import { soxControls } from './controls/soxControls';
import { controlRelationships } from './relationships/controlRelationships';

export const mockControlsData: Record<string, Control[]> = {
  "NIST 800-53": nistControls,
  "PCI-DSS": pciControls,
  "HIPAA": hipaaControls,
  "SOX": soxControls
};

export const mockRelationships: ControlRelationship[] = controlRelationships;

// Updated library statistics after Q4 2024 review
export const libraryStats = {
  totalControls: 2458,
  lastUpdated: "December 15, 2024",
  frameworks: {
    "NIST 800-53": { count: nistControls.length, version: "Rev 5" },
    "PCI-DSS": { count: pciControls.length, version: "4.0" },
    "HIPAA": { count: hipaaControls.length, version: "Security Rule 2024" },
    "SOX": { count: soxControls.length, version: "COSO 2013" }
  },
  nextReviewDate: "March 15, 2025"
};
