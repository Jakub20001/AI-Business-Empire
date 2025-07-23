import React from 'react';
import { ReactNode } from 'react';
export const Card = ({ children, className = ''}: { children: ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = ' ' }: { children: ReactNode; className?: string }) => (
    <div className={`p-2 ${className}`}>{children}</div>
);