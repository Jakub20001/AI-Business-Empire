import { ApiError } from './apiError';

export function validateNiche(data: any) {
    if (!data.name || typeof data.name !== 'string') {
        throw new ApiError(400, 'Invalid or missing "name"');
    }
    if (!data.category || typeof data.category !== 'string') {
        throw new ApiError(400, 'Invalid or missing "category"');
    }
    if (!data.level || typeof data.level !== 'string') {
        throw new ApiError(400, 'Invalid or missing "level"');
    }
}