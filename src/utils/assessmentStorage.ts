// Assessment storage utilities for persistent data

export interface SavedAssessment {
  id: string;
  projectName: string;
  assessmentType: 'compliance-qa' | 'auditor-assessment' | 'project-assessment';
  framework: string;
  domain: string;
  completedAt: string;
  totalQuestions: number;
  score: number;
  status: 'completed' | 'in-progress';
  results: any[];
  relatedReports: string[];
  goalObjectives: string[];
}

const STORAGE_KEY = 'compliance_assessments';

export function saveAssessment(assessment: SavedAssessment): void {
  const saved = getSavedAssessments();
  const existing = saved.findIndex(a => a.id === assessment.id);
  
  if (existing >= 0) {
    saved[existing] = assessment;
  } else {
    saved.push(assessment);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export function getSavedAssessments(): SavedAssessment[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function getAssessmentById(id: string): SavedAssessment | null {
  const saved = getSavedAssessments();
  return saved.find(a => a.id === id) || null;
}

export function deleteAssessment(id: string): void {
  const saved = getSavedAssessments();
  const filtered = saved.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getAssessmentsByProject(projectName: string): SavedAssessment[] {
  const saved = getSavedAssessments();
  return saved.filter(a => a.projectName.toLowerCase().includes(projectName.toLowerCase()));
}

export function getAssessmentsByReport(reportName: string): SavedAssessment[] {
  const saved = getSavedAssessments();
  return saved.filter(a => a.relatedReports.some(r => r.toLowerCase().includes(reportName.toLowerCase())));
}

export function getAssessmentsByGoalObjective(goalObjective: string): SavedAssessment[] {
  const saved = getSavedAssessments();
  return saved.filter(a => a.goalObjectives.some(g => g.toLowerCase().includes(goalObjective.toLowerCase())));
}