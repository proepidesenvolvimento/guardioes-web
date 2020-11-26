const validatePermissions = (group) => {
    if (user.type === "admin")
      return false

    if (group.group_manager)
      if(user.group_manager.id === group.group_manager.id)
        return true
        
    return false
};