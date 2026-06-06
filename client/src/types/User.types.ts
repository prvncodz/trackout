export interface User {
    _id: string;
    avatar?: {
        url: string;
        public_id: string;
    },
    fullname: string;
    email: string;
    height: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
}
