import { Injectable } from '@angular/core';
import { authenticationEnum } from 'src/app/guards/auth.enum';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
  auth?: number;
  isVisible: boolean;
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'home',
    title: 'Home',
    type: 'group',
    icon: 'icon-navigation',
    auth: authenticationEnum.Home,
    isVisible: false,
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      },
      {
        id: 'online-ordering',
        title: 'Online Ordering',
        type: 'item',
        url: '/orders/online-ordering',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      },
      {
        id: 'book-customization',
        title: 'Customized Book Ordering',
        type: 'item',
        url: '/orders/book-customize',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      },
      {
        id: 'order-list',
        title: 'All orders',
        type: 'item',
        url: '/orders/order-list',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      },
      {
        id: 'customized-order-list',
        title: 'All customized orders',
        type: 'item',
        url: '/orders/customized-order-list',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      }
    ]
  },
  {
    id: 'privileges',
    title: 'Privileges Section',
    type: 'group',
    icon: 'icon-navigation',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'privilegeDetails',
        title: 'Privileges',
        type: 'collapse',
        icon: 'ti ti-key',
        auth: authenticationEnum.Privileges,
        isVisible: false,
        children: [
          {
            id: 'systemPrivileges',
            title: 'System Privileges',
            type: 'item',
            url: '/privileges/system-privileges',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.System_Privileges,
            isVisible: false
          },
          {
            id: 'privilegeGroups',
            title: 'Privilege Groups',
            type: 'item',
            url: '/privileges/privilege-groups',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          }
        ]
      }
    ]
  },
  {
    id: 'login',
    title: 'Login Section',
    type: 'group',
    icon: 'icon-navigation',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'loginDetails',
        title: 'Login',
        type: 'collapse',
        icon: 'ti ti-key',
        auth: authenticationEnum.Privileges,
        isVisible: false,
        children: [
          {
            id: 'employeeLogin',
            title: 'Employee Login',
            type: 'item',
            url: '/login/employee-login',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.System_Privileges,
            isVisible: false
          },
          {
            id: 'customerLogin',
            title: 'Customer Login',
            type: 'item',
            url: '/login/customer-login',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          }
        ]
      }
    ]
  },
  {
    id: 'FormDemo',
    title: 'Form Demo',
    type: 'group',
    icon: 'icon-navigation',
    auth: authenticationEnum.Home,
    isVisible: false,
    children: [
      {
        id: 'FormDemoDet',
        title: 'Form-Demo',
        type: 'item',
        url: '/privileges/form-demo',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: true
      }
    ]
  },
  {
    id: 'registration',
    title: 'Registration Section',
    type: 'group',
    icon: 'icon-navigation',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'registrationDetails',
        title: 'Registration',
        type: 'collapse',
        icon: 'ti ti-key',
        auth: authenticationEnum.Privileges,
        isVisible: false,
        children: [
          {
            id: 'employeeRegistraion',
            title: 'Employee Registration',
            type: 'item',
            url: '/registration/employee-registration',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.System_Privileges,
            isVisible: false
          },
          {
            id: 'customerRegistration',
            title: 'Customer Registration',
            type: 'item',
            url: '/registration/customer-registration',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          },
          {
            id: 'itemRegistration',
            title: 'Item Registration',
            type: 'item',
            url: '/registration/item-registration',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          },
          {
            id: 'supplierRegistration',
            title: 'Supplier Registration',
            type: 'item',
            url: '/registration/supplier-registration',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          },
          {
            id: 'sellingItemRegistration',
            title: 'Selling Items',
            type: 'item',
            url: '/registration/selling-item-registration',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          },
          {
            id: 'grn',
            title: 'GRN',
            type: 'item',
            url: '/registration/grn',
            icon: 'ti ti-dashboard',
            breadcrumbs: false,
            auth: authenticationEnum.Privilege_Groups,
            isVisible: false
          }
        ]
      }
    ]
  },
  {
    id: 'Reports',
    title: 'Reports',
    type: 'group',
    icon: 'icon-navigation',
    auth: authenticationEnum.Home,
    isVisible: false,
    children: [
      {
        id: 'EmployeeList',
        title: 'Employee List',
        type: 'item',
        url: '/reports/employee-list',
        icon: 'feather icon-home',
        classes: 'nav-item',
        auth: authenticationEnum.Home_Dashboard,
        isVisible: false
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'icon-ui',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        isVisible: false,
        auth: authenticationEnum.Privileges,
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button',
            isVisible: false,
            auth: authenticationEnum.Privileges
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges',
            isVisible: false,
            auth: authenticationEnum.Privileges
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging',
            isVisible: false,
            auth: authenticationEnum.Privileges
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse',
            isVisible: false,
            auth: authenticationEnum.Privileges
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills',
            isVisible: false,
            auth: authenticationEnum.Privileges
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography',
            isVisible: false,
            auth: authenticationEnum.Privileges
          }
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'forms-element',
        title: 'Form Elements',
        type: 'item',
        url: '/forms/basic',
        classes: 'nav-item',
        icon: 'feather icon-file-text',
        isVisible: false,
        auth: authenticationEnum.Privileges
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables/bootstrap',
        classes: 'nav-item',
        icon: 'feather icon-server',
        isVisible: false,
        auth: authenticationEnum.Privileges
      }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Chart',
    type: 'group',
    icon: 'icon-charts',
    isVisible: false,
    auth: authenticationEnum.Privileges,
    children: [
      {
        id: 'apexChart',
        title: 'ApexChart',
        type: 'item',
        url: 'apexchart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart',
        isVisible: false,
        auth: authenticationEnum.Privileges
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'buy_now',
        title: 'Buy Now',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes.com/item/datta-able-angular/',
        target: true,
        external: true
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
