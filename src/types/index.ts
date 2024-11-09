// src/types/index.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    authProvider: 'apple' | 'google';
    authId: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Product {
    _id: string;
    sellerId: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    status: 'available' | 'sold';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Rating {
    _id: string;
    fromUserId: string;
    toUserId: string;
    score: number;
    comment: string;
    createdAt: Date;
  }
  
  