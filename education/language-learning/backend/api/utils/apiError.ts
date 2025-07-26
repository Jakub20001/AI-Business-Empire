export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleApiError = (err: any) => {
    if (err instanceof ApiError) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: err.statusCode,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
};
