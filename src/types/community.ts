
export interface CommunityEdit {
  id: string;
  type: 'control_update' | 'new_control' | 'mapping_update' | 'new_mapping';
  title: string;
  description: string;
  proposedBy: string;
  proposedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  votes: {
    approve: number;
    reject: number;
    userVotes: Record<string, 'approve' | 'reject'>;
  };
  originalData?: any;
  proposedData: any;
  comments: CommunityComment[];
  reviewers: string[];
}

export interface CommunityComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'review' | 'suggestion';
}

export interface CommunityUser {
  id: string;
  username: string;
  email: string;
  role: 'contributor' | 'reviewer' | 'admin';
  reputation: number;
  contributions: number;
  joinedAt: string;
}

export interface VotingThreshold {
  minApprovalVotes: number;
  minReviewerApprovals: number;
  maxRejectionVotes: number;
  reviewPeriodDays: number;
}
