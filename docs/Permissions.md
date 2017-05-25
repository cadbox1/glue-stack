# Permissions
* default userGroup called Admins
* need a star permission for all

groups are just a collection
users->r-ts->users
users->w-ts->users
users->r-ts->tasks
users->w-ts->tasks

users->r->tasks
users->w->tasks

group entity itself
users->r->taskGroups
users->w->taskGroups

users->r->userGroups
users->w->taskGroups

all users can create groups
    write on groups created (add permission on creation)

permission to users in a group does not mean write group permission

entities
    user
        read
            own client
            group
            specific
        write
            own client
            group
            specific
    userGroup
    task
    taskGroup
    taskSchedule