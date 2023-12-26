import { useUserStore } from "@/stores/user"

export const Roles = {
    USER: 'user',
    GUEST: 'guest',
    OWNER: 'onwer',
    ADMIN: 'admin'
}


export const getRoleUser = () => {
    const user = useUserStore().user
    let role = Roles.GUEST
    if (user) {
        role = user.role
    }
    return role
}
