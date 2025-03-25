export interface Complaint {
    id: number;
    user: string;
    officer?: string;
    admin?: string;
    title: string;
    description: string;
    area_name: string;
    location_link: string;
    created_at: string;
    status: 'PENDING' | 'WORK_ON_PROGRESS' | 'RESOLVED';
  }
  