import { UserRole } from "../enum/user-role.enum";

export interface JwtPayload {
    sub: string; // User ID or any unique identifier
    roles: UserRole[]; // Boolean indicating admin role
    // Other payload properties if needed//
    iat?: number; // Issued at (automatically added by JWT)
    exp?: number; // Expiry (automatically added by JWT)
  }
  