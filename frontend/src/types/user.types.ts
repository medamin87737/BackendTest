// Using const instead of enum to avoid erasableSyntaxOnly error
export const UserRole = {
  HR: 'HR',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  department?: string;
  phoneNumber?: string;
  profilePicture?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  department?: string;
  phoneNumber?: string;
  profilePicture?: string;
}

export type UserRoleId = 'HR' | 'MANAGER' | 'EMPLOYEE' | 'ADMIN';