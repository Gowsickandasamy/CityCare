export interface Complaint {
    id: number;
    user: number;
    officer?: number;
    admin?: number;
    title: string;
    description: string;
    area_name: string;
    location_link: string;
    created_at: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  }
  