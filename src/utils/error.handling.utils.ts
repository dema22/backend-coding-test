import { ConflictException } from '@nestjs/common';

export function handleDatabaseError(error: any): ConflictException | null {
    if (error.name === 'SequelizeUniqueConstraintError') {
        const customMessage = 'Username is already taken';
        return new ConflictException(customMessage);
    }
    
    return null;
}