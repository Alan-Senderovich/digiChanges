import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserCreate from '../../../features/user/templates/UserCreate';
import { createAction } from './handler';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const userRepository = new UserRepository( user() );
    const roleRepository = new RoleRepository( user() );
    const [ getRoles ] = createResource( roleRepository.getRoles() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );

    return (
        <PrivateLayout>
            <UserCreate
                onCreate={createAction( { userRepository } )}
                permissionsList={getPermissions()?.data}
                rolesList={getRoles()?.data}
                loading={getPermissions.loading || getRoles.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
