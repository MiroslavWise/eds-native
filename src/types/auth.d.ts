import React from 'react';

export type AuthStateType = 'SignIn' | 'Main' | 'Gates';

export interface AuthorizationModel {
    children: React.ReactNode;
}
