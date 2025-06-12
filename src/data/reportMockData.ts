
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
