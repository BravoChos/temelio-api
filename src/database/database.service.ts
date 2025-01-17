import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}
