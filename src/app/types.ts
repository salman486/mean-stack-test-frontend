export interface UserOrganizations {
  id: number;
  login: string;
  url: string;
  repos_url: string;
  repos?: {
    id: number;
    name: string;
    full_name: string;
    url: string;
    git_url: string;
    isIncluded?: boolean;
  }[];
}

export interface UserType {
  id: string;
  email?: string;
  name: string;
  data?: {
    orgs?: UserOrganizations[];
  };
}

export interface RepoDetailsType {
  id: string;
  name: string;
  details: {
    commits: number;
    prs: number;
    issues: number;
    username: string;
  }[];
}
