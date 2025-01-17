import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateNonprofitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';
@Injectable()
export class NonprofitService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createNonprofitDto: CreateNonprofitDto) {
    const { code, name, address, email, type = null } = createNonprofitDto;

    const query = `
      INSERT INTO nonprofits (code, name, address, email, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    try {
      const result = await this.databaseService.executeQuery(query, [
        code,
        name,
        address,
        email,
        type,
      ]);
      return result[0];
    } catch (err) {
      return {
        message: 'duplicate code, code already exists',
      };
    }
  }

  async findAll() {
    const query = `SELECT * FROM nonprofits;`;
    try {
      const result = await this.databaseService.executeQuery(query);
      return result;
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }

  async findOne(id: number) {
    const query = `SELECT * FROM nonprofits n WHERE n.id = $1;`;
    try {
      const result = await this.databaseService.executeQuery(query, [id]);
      return result[0];
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }

  async findAllbyFoundationId(id: number) {
    const query = `SELECT * FROM foundation_nonprofit fn WHERE fn.foundation_id;`;
    try {
      const result = await this.databaseService.executeQuery(query);
      return result;
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }

  async update(id: number, updateNonprofitDto: UpdateNonprofitDto) {
    const { code, name, address, email, type = null } = updateNonprofitDto;

    const query = `
      UPDATE nonprofits SET 
        code = $1,
        name = $2,
        address = $3,
        email = $4,
        type = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;

    try {
      const result = await this.databaseService.executeQuery(query, [
        code,
        name,
        address,
        email,
        type,
        id,
      ]);
      return result[0];
    } catch (err) {
      return {
        message: 'duplicate code, code already exists',
      };
    }
  }
}
