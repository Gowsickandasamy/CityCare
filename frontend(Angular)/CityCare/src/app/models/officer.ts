export interface Officer {
    userId: number;
    username: string;
    email: string;
    area_of_control: string;
    reports_to?: number | null;
    average_rating: number
  }