import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTemplateDto: CreateTemplateDto) {
    const { subject, message, type = 'BASIC' } = createTemplateDto;

    const query = `
      INSERT INTO templates (subject, content, type)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    try {
      const result = await this.databaseService.executeQuery(query, [
        subject,
        message,
        type,
      ]);
      return result[0];
    } catch (err) {
      console.log(err);
      return {
        message: 'error in template.create',
      };
    }
  }

  async findAll() {
    const query = `SELECT * FROM templates;`;
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
    const query = `SELECT * FROM templates t WHERE t.id = $1;`;
    try {
      const result = await this.databaseService.executeQuery(query, [id]);
      return result[0];
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    const { subject, message, type = 'BASIC' } = updateTemplateDto;

    const query = `
      UPDATE templates SET 
        subject = $1,
        message = $2,
        type = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *;
    `;

    try {
      const result = await this.databaseService.executeQuery(query, [
        subject,
        message,
        type,
        id,
      ]);
      return result[0];
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }
}
