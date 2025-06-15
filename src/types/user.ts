
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastActive: string;
  permissions: Permission[];
}

export type UserRole = "admin" | "analyst" | "viewer" | "auditor";

export interface Permission {
  resource: string;
  actions: ("read" | "write" | "delete" | "approve")[];
}

export interface Collaboration {
  id: string;
  userId: string;
  controlId: string;
  type: "comment" | "suggestion" | "approval" | "rejection";
  content: string;
  timestamp: string;
  status: "active" | "resolved";
}
