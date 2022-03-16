import { lazy } from 'solid-js';
import IconCog from '../atoms/Icons/Stroke/IconCog';
import IconDashboard from '../atoms/Icons/Stroke/IconDashboard';
import IconHome from '../atoms/Icons/Stroke/IconHome';
import IconPencilAlt from '../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../atoms/Icons/Stroke/IconPlus';
import IconUsers from '../atoms/Icons/Stroke/IconUsers';
import IconViewList from '../atoms/Icons/Stroke/IconViewList';
import { permissions } from './permissions';
// import IconCog from '../atoms/Icons/Stroke/IconCog';
// import IconHome from '../atoms/Icons/Stroke/IconHome';
// import IconLogout from '../atoms/Icons/Stroke/IconLogout';
// import IconPlus from '../atoms/Icons/Stroke/IconPlus';
// import IconUsers from '../atoms/Icons/Stroke/IconUsers';
// import IconViewList from '../atoms/Icons/Stroke/IconViewList';
// import {permissions} from './permissions'

export const dashRoutes = [
    {
        path: '/',
        component: lazy( () => import( '../pages/dashboard' ) ),
        name: 'a_home',
        icon: IconHome,
        showItem: true,
        permission: 'Dashboard',
    },
    {
        path: '/login',
        component: lazy( () => import( '../pages/login' ) ),
        name: 'a_login',
        icon: IconHome,
        showItem: false,
        permission: 'Dashboard',
    },
    {
        path: '/dashboard',
        component: lazy( () => import( '../pages/dashboard' ) ),
        name: 'a_dashboard',
        icon: IconDashboard,
        showItem: true,
        permission: 'Dashboard',
    },
    {
        path: '/users',
        name: 'u_users',
        icon: IconUsers,
        showItem: true,
        permission: permissions.USERS.SHOW,
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/users' ) ),
                name: 'u_home',
                icon: IconHome,
                showItem: true,
                permission: permissions.USERS.LIST,
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/users/create' ) ),
                name: 'u_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.USERS.SAVE,
            },
            {
                path: '/view',
                component: lazy( () => import( '../pages/users/view' ) ),
                name: 'u_view',
                icon: IconViewList,
                showItem: false,
                permission: permissions.USERS.SHOW,
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/users/update/[id]' ) ),
                name: 'u_update',
                icon: IconPencilAlt,
                showItem: false,
                permission: permissions.USERS.UPDATE,
            },
            {
                path: '/editPassword/:id',
                component: lazy( () => import( '../pages/users/editPassword' ) ),
                name: 'u_edit_password',
                icon: IconPencilAlt,
                showItem: false,
                permission: 'Dashboard',
            },
        ],
    },
    {
        path: '/UserChangePass/:token',
        component: lazy( () => import( '../pages/users/changePassword' ) ),
        name: 'u_edit_password',
        icon: IconPencilAlt,
        showItem: false,
    },
    {
        path: '/roles',
        name: 'r_roles',
        icon: IconCog,
        showItem: true,
        permission: permissions.ROLES.SHOW,
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/roles' ) ),
                name: 'r_home',
                icon: IconHome,
                showItem: true,
                permission: permissions.ROLES.LIST,
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/roles/create' ) ),
                name: 'r_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.ROLES.SAVE,
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/roles/update/[id]' ) ),
                name: 'r_update',
                showItem: false,
                icon: IconPencilAlt,
                permission: permissions.ROLES.UPDATE,
            },
        ],
    },
    {
        path: '/*all',
        component: lazy( () => import( '../pages/dashboard' ) ),
    },
];

// export const dashRoutes = [
//     {
//         path: '',
//         name: 'Menu',
//         icon: null,
//         permission: null
//     },
//     {
//         path: '/dashboard',
//         name: 'Dashboard',
//         icon: IconHome,
//         permission: 'Dashboard'
//     },
//     {
//         path: '/users',
//         name: 'Users',
//         icon: IconUsers,
//         permission: 'Dashboard',
//
//         // permission: permissions.USERS.LIST,
//         children: [
//             {
//                 path: '/users/create',
//                 name: 'Create',
//                 icon: IconPlus,
//                 permission: 'Dashboard'
//
//                 // permission: permissions.USERS.SAVE
//             },
//             {
//                 path: '/users/',
//                 name: 'List',
//                 icon: IconViewList,
//                 permission: 'Dashboard'
//                 // permission: permissions.USERS.LIST
//             }
//         ]
//     },
//     {
//         path: '/roles',
//         name: 'Roles',
//         icon: IconCog,
//         permission: 'Dashboard',
//         // permission: permissions.ROLES.LIST,
//         levels: [
//             {
//                 path: '/roles/create',
//                 name: 'Create',
//                 icon: IconPlus,
//                 permission: 'Dashboard'
//                 // permission: permissions.ROLES.SAVE
//             },
//             {
//                 path: '/roles/',
//                 name: 'List',
//                 icon: IconViewList,
//                 permission: 'Dashboard'
//                 // permission: permissions.ROLES.LIST
//             }
//         ]
//     },
//     {
//         path: '/logout',
//         name: 'Logout',
//         icon: IconLogout,
//         permission: 'Dashboard'
//         // permission: permissions.USERS.LIST
//     }
// ];

export const defaultRoute = '/users/list';
