export class Nonprofit {
  id: string;
  code: string;
  name: string;
  address: string;
  email: string;
  type: string | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
