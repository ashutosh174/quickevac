const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },

    {
      id: 'user_management',
      title: 'User Management',
      type: 'group',
      icon: 'icon-user',
      children: [
        {
          id: 'user_list',
          title: 'User Management',
          type: 'item',
          icon: 'feather icon-user',
          url: '/user_management/user'
        }
      ]
    },
    {
      id: 'role_management',
      title: 'Access Management',
      type: 'group',
      icon: 'icon-user',
      children: [
        {
          id: 'role_list',
          title: 'Role Management',
          type: 'item',
          icon: 'feather icon-user',
          url: '/role/role_management'
        }
      ]
    },
    {
      id: 'user_alert',
      title: 'Alert User',
      type: 'group',
      icon: 'icon-bell',
      children: [
        {
          id: 'user_alert',
          title: 'Alert User',
          type: 'item',
          icon: 'feather icon-bell',
          url: '/user_alert/user_alert'
        }
      ]
    }
  ]
};

export default menuItems;
